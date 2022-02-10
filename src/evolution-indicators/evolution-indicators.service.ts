import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NetworkDto } from '../networks/dto/network.dto';
import { EvolutionIndicatorDto } from './dto/evolution-indicator.dto';
import {
  EvolutionIndicator,
  EvolutionIndicatorDocument,
} from './schemas/evolution-indicator.schema';

@Injectable()
export class EvolutionIndicatorsService {
  constructor (
    @InjectModel(EvolutionIndicator.name)
    private indicatorModel: Model<EvolutionIndicatorDocument>,
  ) { }

  async create(indicatorDto: EvolutionIndicatorDto) {
    const indicator = new this.indicatorModel(indicatorDto);
    await indicator.save();
  }

  async createMany(indicatorDtos: Array<EvolutionIndicatorDto>) {
    await this.indicatorModel.insertMany(indicatorDtos);
  }

  async findByDates(init: Date, end: Date): Promise<EvolutionIndicator[]> {
    if (!init && !end) {
      const todayMinusOneYear = new Date();
      todayMinusOneYear.setFullYear(todayMinusOneYear.getFullYear() - 1);
      init = todayMinusOneYear
      end = new Date()
    } else {
      init = new Date(init)
      end = new Date(end)
    }
    /* foi adicionado o aggregate para filtrar 
    somente os indicadores do último dia de cada mês. 
    Isso porque o serviço que insere os indicadores 
    está rodando diariamente */
    return this.indicatorModel
      .aggregate([
        {
          $match: {
            createdAt: {
              $gte: init,
              $lte: end
            },
            sourceType: {
              $in: [
                'Revista Científica',
                'Biblioteca Digital de Teses e Dissertações',
                'Repositório de Dados de Pesquisa',
                'Repositório de Publicações',
                'Portal Agregador',
                'Biblioteca Digital de Monografias',
                'Servidor de Preprints'
              ],
            },
          }
        },
        { $addFields: { createdAt: { $toDate: "$createdAt" } } },
        { $sort: { createdAt: -1 } },
        {
          $group: {
            _id: {
              id: "$id",
              sourceType: "$sourceType",
              month: { $month: "$createdAt" },
              year: { $year: "$createdAt" }
            },
            content: {
              $first: {
                createdAt: "$createdAt",
                numberOfNetworks: "$numberOfNetworks",
                numberOfDocuments: "$numberOfDocuments",
                sourceType: "$sourceType"
              },
            }
          }
        },
        // {
        //   $group: {
        //     _id: "$_id.id",
        //     content: { $push: "$content" },
        //   },
        // }
      ])
      // .find(
      //   {
      //     sourceType: {
      //       $in: [
      //         'Revista Científica',
      //         'Biblioteca Digital de Teses e Dissertações',
      //         'Repositório de Dados de Pesquisa',
      //         'Repositório de Publicações',
      //         'Portal Agregador',
      //         'Biblioteca Digital de Monografias',
      //         'Servidor de Preprints'
      //       ],
      //     },
      //     createdAt: {
      //       $gte: init,
      //       $lte: end
      //     }
      //   },
      //   'sourceType createdAt numberOfNetworks numberOfDocuments',
      // )
      .collation({ locale: 'pt' })
      .sort({ "content.createdAt": 1 })
      .exec();
  }

  async processIndicator(networkDtos: NetworkDto[]) {
    console.debug(`processIndicatorsDocumentByDataNetworkType`);
    const indicatorsMap: Map<string, EvolutionIndicatorDto> = new Map();

    networkDtos.map((network) => {
      if (!network.sourceType) {
        network.sourceType = 'Indefinido';
      }
      if (indicatorsMap.get(network.sourceType)) {
        indicatorsMap.get(network.sourceType).numberOfNetworks =
          indicatorsMap.get(network.sourceType).numberOfNetworks + 1;
        indicatorsMap.get(network.sourceType).numberOfDocuments +
          network.validSize;
      } else {
        indicatorsMap.set(
          network.sourceType,
          new EvolutionIndicatorDto(network.sourceType, 1, network.validSize),
        );
      }
    });
    const indicators = Array.from(indicatorsMap.values());
    await this.createMany(indicators);
  }
}
