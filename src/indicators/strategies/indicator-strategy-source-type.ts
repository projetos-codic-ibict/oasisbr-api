import { Network, Prisma } from '@prisma/client';
import { IndicatorType } from '../enums/indicator-type.enum';
import { IndicatorsService } from '../indicators.service';
import { IndicatorStrategy } from './indicator.strategy.interface';

export class IndicatorBySourceType implements IndicatorStrategy {
  constructor(private readonly indicatorsService: IndicatorsService) {}
  processIndicator(networks: Network[]) {
    console.debug(`processIndicatorsDocumentByType`);
    const indicatorsMap: Map<string, Prisma.IndicatorCreateInput> = new Map();

    networks.map((network) => {
      if (!network.sourceType) {
        network.sourceType = 'Indefinido';
      }
      if (indicatorsMap.get(network.sourceType)) {
        indicatorsMap.get(network.sourceType).value = indicatorsMap.get(network.sourceType).value + 1;
      } else {
        const indicatorCreateInput: Prisma.IndicatorCreateInput = {
          name: network.sourceType,
          value: 1,
          type: IndicatorType.SOURCE_TYPE,
        };
        indicatorsMap.set(network.sourceType, indicatorCreateInput);
      }
    });
    const indicators = Array.from(indicatorsMap.values());
    this.updateIndicatorsDocumentByType(indicators);
  }

  private async updateIndicatorsDocumentByType(indicatorsCreateInput: Array<Prisma.IndicatorCreateInput>) {
    console.debug(`init updateIndicatorsDocumentByType`);
    indicatorsCreateInput.forEach(async (indicatorCreateInput) => {
      await this.indicatorsService.update(indicatorCreateInput.name, indicatorCreateInput);
    });
    console.debug(`finish updateIndicatorsDocumentByType`);
  }
}
