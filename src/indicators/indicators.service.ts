import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NetworkDto } from '../networks/dto/network.dto';
import { IndicatorDto } from './dto/indicator.dto';
import { IndicatorType } from './enums/indicator-type.enum';
import { Indicator, IndicatorDocument } from './schemas/indicator.schema';
import { getUsefulNameSourceType } from '../utils/SourceTypeFormat';

@Injectable()
export class IndicatorsService {
  constructor(
    @InjectModel(Indicator.name)
    private indicatorModel: Model<IndicatorDocument>,
    private readonly logger: Logger,
  ) {}

  async findAll(): Promise<Indicator[]> {
    return this.indicatorModel.find({}, 'name value').exec();
  }

  async findByType(type: IndicatorType): Promise<Indicator[]> {
    return this.indicatorModel
      .find({ type: type }, { _id: 0, name: 1, value: 1 })
      .sort('name')
      .exec();
  }

  async update(name: string, indicatorDto: IndicatorDto) {
    await this.indicatorModel.updateOne({ name: name }, indicatorDto, {
      upsert: true,
    });
  }

  private async removeByType(type: IndicatorType) {
    this.logger.log(`removing all indicators`);
    await this.indicatorModel.deleteMany({ type: type });
    this.logger.log(`all networks indicators`);
  }

  private async createMany(indicatorDtos: Array<IndicatorDto>) {
    await this.indicatorModel.insertMany(indicatorDtos);
    this.logger.log(`all networks created again`);
  }

  private async removeAllAndInsertByType(
    indicatorsDto: IndicatorDto[],
    type: IndicatorType,
  ) {
    try {
      await this.removeByType(type);
      await this.createMany(indicatorsDto);
    } catch (err) {
      console.error(err);
    }
  }

  processIndicatorBySourceType(networkDtos: NetworkDto[]) {
    try {
      console.log(`processIndicatorsDocumentByType`);
      const indicatorsDtoMap: Map<string, IndicatorDto> = new Map();

      networkDtos.map((network) => {
        network.sourceType = getUsefulNameSourceType(network.sourceType);
        if (!network.sourceType) {
          network.sourceType = 'Indefinido';
        }
        if (indicatorsDtoMap.get(network.sourceType)) {
          indicatorsDtoMap.get(network.sourceType).value += 1;
        } else {
          indicatorsDtoMap.set(
            network.sourceType,
            new IndicatorDto(network.sourceType, 1, IndicatorType.SOURCE_TYPE),
          );
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
