import { Injectable, Logger } from '@nestjs/common';
import { EvolutionIndicator, Network, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { EvolutionIndicatorDto } from './dto/evolution-indicator.dto';

@Injectable()
export class EvolutionIndicatorsService {
  constructor(
    private prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async create(data: Prisma.EvolutionIndicatorCreateInput): Promise<EvolutionIndicator> {
    return this.prisma.evolutionIndicator.create({
      data,
    });
  }

  async createMany(data: Array<Prisma.EvolutionIndicatorCreateInput>) {
    return await this.prisma.evolutionIndicator.createMany({
      data,
    });
  }

  async findByDates(init: Date, end: Date): Promise<EvolutionIndicator[]> {
    if (!init && !end) {
      const todayMinusOneYear = new Date();
      todayMinusOneYear.setFullYear(todayMinusOneYear.getFullYear() - 1);
      init = todayMinusOneYear;
      end = new Date();
    } else {
      init = new Date(init);
      end = new Date(end);
    }
    /* foi adicionado o aggregate para filtrar 
    somente os indicadores do último dia de cada mês. 
    Isso porque o serviço que insere os indicadores 
    está rodando diariamente */
    // Consulta adaptada para Prisma
    const results = await this.prisma.evolutionIndicator.groupBy({
      by: ['id', 'sourceType'],
      where: {
        createdAt: {
          gte: init,
          lte: end,
        },
        sourceType: {
          in: [
            'Revista Científica',
            'Biblioteca Digital de Teses e Dissertações',
            'Repositório de Dados de Pesquisa',
            'Repositório de Publicações',
            'Portal Agregador',
            'Biblioteca Digital de Monografia',
            'Servidor de Preprints',
          ],
        },
      },
      _min: {
        createdAt: true,
      },
      _max: {
        createdAt: true,
      },
      _first: {
        numberOfNetworks: true,
        numberOfDocuments: true,
        createdAt: true,
        sourceType: true,
      },
      orderBy: {
        createdAt: 'desc', // Ordem decrescente para pegar o último de cada mês
      },
    });

    // Mapeando e transformando os resultados para incluir mês e ano
    const groupedResults = results.map((item) => ({
      id: item.id,
      sourceType: item.sourceType,
      month: item.createdAt.getMonth() + 1, // Para obter o mês
      year: item.createdAt.getFullYear(), // Para obter o ano
      content: {
        createdAt: item.createdAt,
        numberOfNetworks: item.numberOfNetworks,
        numberOfDocuments: item.numberOfDocuments,
        sourceType: item.sourceType,
      },
    }));

    return groupedResults;
  }

  async processIndicator(networks: Network[]) {
    this.logger.log('init process evolutions indicators');
    const indicatorsMap: Map<string, EvolutionIndicatorDto> = new Map();

    networks.map((network) => {
      if (!network.sourceType) {
        network.sourceType = 'Indefinido';
      }
      if (indicatorsMap.get(network.sourceType)) {
        indicatorsMap.get(network.sourceType).numberOfNetworks += 1;
        indicatorsMap.get(network.sourceType).numberOfDocuments += network.validSize;
      } else {
        indicatorsMap.set(network.sourceType, new EvolutionIndicatorDto(network.sourceType, 1, network.validSize));
      }
    });
    const indicators = Array.from(indicatorsMap.values());
    await this.createMany(indicators);
    this.logger.log('process evolutions indicators successful!');
  }
}
