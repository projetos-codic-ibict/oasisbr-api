import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NetworkDto } from '../networks/dto/network.dto';
import { IndicatorDto } from './dto/indicator.dto';
import { IndicatorType } from './enums/indicator-type.enum';
import { Indicator, IndicatorDocument } from './schemas/indicator.schema';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';
import { getUsefulNameSourceType } from '../utils/SourceTypeFormat';

@Injectable()
export class IndicatorsService {
  constructor(
    @InjectModel(Indicator.name)
    private indicatorModel: Model<IndicatorDocument>,
    private httpService: HttpService,
    private configService: ConfigService,
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

  async updateMany(indicatorsDto: IndicatorDto[]) {
    try {
      indicatorsDto.forEach(async (indicatorDto) => {
        await this.update(indicatorDto.name, indicatorDto);
      });
    } catch (err) {
      console.error(err);
    }
  }

  async getFromSolr(facetField: IndicatorType) {
    try {
      const URL = this.configService.get<string>('SOLR_URL');
      return this.httpService
        .get(
          `${URL}?facet.field=${facetField}&facet=on&indent=on&q=*:*&rows=0&wt=json&facet.limit=10`,
        )
        .pipe(
          map((response) => {
            const top10 = response.data.facet_counts.facet_fields[facetField];
            const indicators = [];
            for (let i = 0; i < top10.length; i += 2) {
              const indicatorDto = new IndicatorDto(
                top10[i],
                top10[i + 1],
                null,
              );
              indicators.push(indicatorDto);
            }
            return indicators;
          }),
        );
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
          indicatorsDtoMap.get(network.sourceType).value =
            indicatorsDtoMap.get(network.sourceType).value + 1;
        } else {
          indicatorsDtoMap.set(
            network.sourceType,
            new IndicatorDto(network.sourceType, 1, IndicatorType.SOURCE_TYPE),
          );
        }
      });
      const indicatorsDto = Array.from(indicatorsDtoMap.values());
      this.updateMany(indicatorsDto);

      console.log(`finish updateIndicatorsDocumentByType`);
    } catch (err) {
      console.error(err);
    }
  }

  // getSourceTypeFormat(sourceType: string) {
  //   if (
  //     sourceType === 'Repositório de Dados' ||
  //     sourceType === 'Repositório de Dados de Pesquisa'
  //   ) {
  //     return 'Repositório de Dados';
  //   } else if (
  //     sourceType === 'Repositório Comum' ||
  //     sourceType === 'Repositório Institucional' ||
  //     sourceType === 'Repositório Temático' ||
  //     sourceType === 'Repositório de Publicações'
  //   ) {
  //     return 'Repositório de Publicações';
  //   } else if (sourceType === 'Revista') {
  //     return 'Revistas científicas';
  //   } else {
  //     return sourceType;
  //   }
  // }
}
