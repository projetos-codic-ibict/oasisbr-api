/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Network, Prisma } from '@prisma/client';
import { EvolutionIndicatorsService } from '../evolution-indicators/evolution-indicators.service';
import { IndicatorsService } from '../indicators/indicators.service';
import { NetworksService } from '../networks/networks.service';
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

  /** Vai resetar uma vez por dia para que o indicador de
   * evolução seja processado somente uma vez por dia **/
  @Cron(CronExpression.EVERY_DAY_AT_7AM)
  resetParams() {
    this.logger.log('reseting params');
    this.updateEvolutionIndicatorParam('false');
  }

  private updateEvolutionIndicatorParam(value: string) {
    const eiDto: Prisma.ParamCreateInput = {
      name: ParamName.LOAD_EVOLUTION_INDICADORS,
      value: value,
      updatedAt: new Date(),
    };
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

  processNetworks(allNetworks: any[]) {
    this.logger.debug(`qtd networks to process: ${allNetworks.length}`);
    const networks: Array<Network> = [];
    allNetworks.forEach((item) => {
      //@ts-ignore
      const network: Network = {};
      network.id = item.networkID;
      network.acronym = item.acronym;
      network.name = item.name;
      network.institution = item.institution;
      network.validSize = item.validSize;
      if (item.attributes) {
        network.sourceUrl = item.attributes.source_url;
        network.sourceType = getUsefulNameSourceType(item.attributes.source_type);
        network.issn = item.attributes.issn;
        network.email = item.attributes.contact_email;
        network.uf = item.attributes.state;
      }
      networks.push(network);
    });
    this.updateNetworks(networks);
    this.indicatorsService.processIndicatorBySourceType(networks);
    this.updateEvolutionIndicators(networks);
  }

  private async updateEvolutionIndicators(networksCreateInput: Network[]) {
    const eiParam = await this.paramsService.findByName(ParamName.LOAD_EVOLUTION_INDICADORS);
    if (eiParam.value == 'false') {
      this.evolutionIndicatorsService.processIndicator(networksCreateInput);
      this.logger.log('changing evolution param');
      this.updateEvolutionIndicatorParam('true');
    }
  }

  private async updateNetworks(networksCreateInput: Array<Network>) {
    this.logger.log(`init updateNetworks, qtd: ${networksCreateInput.length}`);
    await this.networksService.removeAllAndInsertAll(networksCreateInput);
    this.logger.log(`finish updateNetworks`);
  }
}
