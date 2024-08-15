import { Injectable, Logger } from '@nestjs/common';
import { Indicator, Network, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { getUsefulNameSourceType } from '../utils/SourceTypeFormat';
import { IndicatorType } from './enums/indicator-type.enum';

@Injectable()
export class IndicatorsService {
  constructor(
    private prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async findAll() {
    return this.prisma.indicator.findMany();
  }

  async findByType(type: IndicatorType): Promise<Indicator[]> {
    return this.prisma.indicator.findMany({ where: { type: type }, orderBy: { name: 'asc' } });
  }

  async update(name: string, indicatorUpdateInput: Prisma.IndicatorUpdateInput) {
    await this.prisma.indicator.update({
      where: { name },
      data: indicatorUpdateInput,
    });
  }

  private async removeByType(type: IndicatorType) {
    this.logger.log(`--removing all indicators`);
    await this.prisma.indicator.deleteMany({ where: { type: type } });
    this.logger.log(`--all networks indicators`);
  }

  private async createMany(indicatorsCreateInput: Array<Prisma.IndicatorCreateInput>) {
    this.logger.log(`++creating all indicators`);
    await this.prisma.indicator.createMany({ data: indicatorsCreateInput });
    this.logger.log(`++all networks created again`);
  }

  private async removeAllAndInsertByType(indicatorsCreateInput: Prisma.IndicatorCreateInput[], type: IndicatorType) {
    try {
      await this.removeByType(type);
      await this.createMany(indicatorsCreateInput);
    } catch (err) {
      console.error(err);
    }
  }

  processIndicatorBySourceType(networks: Network[]) {
    try {
      console.log(`processIndicatorsDocumentByType`);
      const indicatorsDtoMap: Map<string, Indicator> = new Map();

      networks.map((network) => {
        network.sourceType = getUsefulNameSourceType(network.sourceType);
        if (!network.sourceType) {
          network.sourceType = 'Indefinido';
        }
        if (indicatorsDtoMap.get(network.sourceType)) {
          indicatorsDtoMap.get(network.sourceType).value += 1;
        } else {
          indicatorsDtoMap.set(network.sourceType, new IndicatorDto(network.sourceType, 1, IndicatorType.SOURCE_TYPE));
        }
      });
      const indicatorsDto = Array.from(indicatorsDtoMap.values());
      this.removeAllAndInsertByType(indicatorsDto, IndicatorType.SOURCE_TYPE);

      console.log(`finish updateIndicatorsDocumentByType`);
    } catch (err) {
      console.error(err);
    }
  }
}
