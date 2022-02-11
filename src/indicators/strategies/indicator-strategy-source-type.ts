import { NetworkDto } from '../../networks/dto/network.dto';
import { IndicatorDto } from '../dto/indicator.dto';
import { IndicatorType } from '../enums/indicator-type.enum';
import { IndicatorsService } from '../indicators.service';
import { IndicatorStrategy } from './indicator.strategy.interface';

export class IndicatorBySourceType implements IndicatorStrategy {
  constructor(private readonly indicatorsService: IndicatorsService) {}
  processIndicator(networksDtos: NetworkDto[]) {
    console.debug(`processIndicatorsDocumentByType`);
    const indicatorsMap: Map<string, IndicatorDto> = new Map();

    networksDtos.map((network) => {
      if (!network.sourceType) {
        network.sourceType = 'Indefinido';
      }
      if (indicatorsMap.get(network.sourceType)) {
        indicatorsMap.get(network.sourceType).value =
          indicatorsMap.get(network.sourceType).value + 1;
      } else {
        indicatorsMap.set(
          network.sourceType,
          new IndicatorDto(network.sourceType, 1, IndicatorType.SOURCE_TYPE),
        );
      }
    });
    const indicators = Array.from(indicatorsMap.values());
    this.updateIndicatorsDocumentByType(indicators);
  }

  private async updateIndicatorsDocumentByType(
    indicatorDtos: Array<IndicatorDto>,
  ) {
    console.debug(`init updateIndicatorsDocumentByType`);
    indicatorDtos.forEach(async (indicatorDto) => {
      await this.indicatorsService.update(indicatorDto.name, indicatorDto);
    });
    console.debug(`finish updateIndicatorsDocumentByType`);
  }
}
