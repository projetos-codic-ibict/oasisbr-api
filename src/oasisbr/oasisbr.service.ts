import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EvolutionIndicatorsService } from '../evolution-indicators/evolution-indicators.service';
import { NetworkDto } from '../networks/dto/network.dto';
import { NetworksService } from '../networks/networks.service';
// import * as networks from '../../networks_oasisbr.json';
import { IndicatorsService } from '../indicators/indicators.service';
import { ParamDto } from '../params/dto/param.dto';
import { ParamName } from '../params/enums/param.enum';
import { ParamsService } from '../params/params.service';
import { getUsefulNameSourceType } from '../utils/SourceTypeFormat';

@Injectable()
export class OasisbrService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private readonly networksService: NetworksService,
    private readonly evolutionIndicatorsService: EvolutionIndicatorsService,
    private readonly indicatorsService: IndicatorsService,
    private readonly paramsService: ParamsService,
    private readonly logger: Logger,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  resetParams() {
    this.logger.log('reseting params');
    this.updateEvolutionIndicatorParam('false');
  }

  private updateEvolutionIndicatorParam(value: string) {
    const eiDto = new ParamDto(ParamName.LOAD_EVOLUTION_INDICADORS, value);
    this.paramsService.update(ParamName.LOAD_EVOLUTION_INDICADORS, eiDto);
  }

  @Cron(CronExpression.EVERY_HOUR)
  loadOasisbrNetworks() {
    this.logger.log('Get all OasisBr networks');
    const URL = this.configService.get<string>('HARVESTER_API_URL');
    const USERNAME = this.configService.get<string>('HARVESTER_API_USERNAME');
    const PASS = this.configService.get<string>('HARVESTER_API_PASS');
    try {
      this.httpService
        .get(URL, {
          auth: {
            username: USERNAME,
            password: PASS,
          },
        })
        .subscribe({
          next: (res) => {
            this.logger.log('Get all OasisBr networks success');
            const networks = res.data;
            this.processNetworks(networks);
          },
          error: (e) => this.logger.error('Get all OasisBr networks error:', e.message),
          complete: () => this.logger.log('Get all OasisBr networks finished'),
        });
    } catch (error) {
      this.logger.error('HARVESTER_API_PASS: ', error);
    }
  }

  processNetworks(networks: any[]) {
    this.logger.debug(`qtd networks to process: ${networks.length}`);
    const networkDtos: Array<NetworkDto> = [];
    networks.forEach((network) => {
      const networkDto = new NetworkDto();
      networkDto.id = network.networkID;
      networkDto.acronym = network.acronym;
      networkDto.name = network.name;
      networkDto.institution = network.institution;
      networkDto.validSize = network.validSize;
      if (network.attributes) {
        networkDto.sourceUrl = network.attributes.source_url;
        networkDto.sourceType = getUsefulNameSourceType(network.attributes.source_type);
        networkDto.issn = network.attributes.issn;
        networkDto.email = network.attributes.contact_email;
        networkDto.uf = network.attributes.state;
      }
      networkDtos.push(networkDto);
    });
    this.updateNetworks(networkDtos);
    this.indicatorsService.processIndicatorBySourceType(networkDtos);
    this.updateEvolutionIndicators(networkDtos);
  }

  private async updateEvolutionIndicators(networkDtos: NetworkDto[]) {
    const eiParam = await this.paramsService.findByName(ParamName.LOAD_EVOLUTION_INDICADORS);
    if (eiParam.value == 'false') {
      this.evolutionIndicatorsService.processIndicator(networkDtos);
      this.logger.log('changing evolution param');
      this.updateEvolutionIndicatorParam('true');
    }
  }

  private async updateNetworks(networkDtos: Array<NetworkDto>) {
    this.logger.log(`init updateNetworks, qtd: ${networkDtos.length}`);
    await this.networksService.removeAllAndInsertAll(networkDtos);
    this.logger.log(`finish updateNetworks`);
  }
}
