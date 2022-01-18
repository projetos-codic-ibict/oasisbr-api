import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NetworkDto } from '../networks/dto/network.dto';
import { NetworksService } from '../networks/networks.service';
import { ConfigService } from '@nestjs/config';
import { EvolutionIndicatorsService } from '../evolution-indicators/evolution-indicators.service';
// import * as networks from '../../networks_oasisbr.json';
import { IndicatorsService } from '../indicators/indicators.service';
import { getUsefulNameSourceType } from '../utils/SourceTypeFormat';

@Injectable()
export class OasisbrService {
  constructor (
    private httpService: HttpService,
    private configService: ConfigService,
    private readonly networksService: NetworksService,
    private readonly evolutionIndicatorsService: EvolutionIndicatorsService,
    private readonly indicatorsService: IndicatorsService,
    private readonly logger: Logger,
  ) { }

  // @Cron(CronExpression.EVERY_MINUTE)
  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_NOON)
  loadOasisbrNetworks() {
    this.logger.debug('Get all OasisBr networks')
    const URL = this.configService.get<string>('HARVESTER_API_URL')
    const USERNAME = this.configService.get<string>('HARVESTER_API_USERNAME')
    const PASS = this.configService.get<string>('HARVESTER_API_PASS')
    this.httpService.get(URL, {
      auth: {
        username: USERNAME,
        password: PASS
      }
    }).subscribe(async res => {
      const networks = res.data
      this.processNetworks(networks)
    })
  }

  processNetworks(networks: any[]) {
    this.logger.debug(`init processNetworks`);
    const networkDtos: Array<NetworkDto> = [];
    networks.forEach((network) => {
      const networkDto = new NetworkDto();
      networkDto.id = network.networkID;
      networkDto.name = network.name;
      networkDto.institution = network.institution;
      networkDto.validSize = network.validSize;
      if (network.attributes) {
        networkDto.sourceUrl = network.attributes.source_url;
        networkDto.sourceType = getUsefulNameSourceType(
          network.attributes.source_type,
        );
        networkDto.issn = network.attributes.issn;
        networkDto.email = network.attributes.contact_email;
      }
      networkDtos.push(networkDto);
    });
    this.updateNetworks(networkDtos);
    this.evolutionIndicatorsService.processIndicator(networkDtos);
    this.indicatorsService.processIndicatorBySourceType(networkDtos);
  }

  private async updateNetworks(networkDtos: Array<NetworkDto>) {
    this.logger.log(`init updateNetworks`);
    networkDtos.forEach(async (networkDto) => {
      await this.networksService.update(networkDto.id, networkDto);
    });
    this.logger.log(`finish updateNetworks`);
  }
}
