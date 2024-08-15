/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, Logger } from '@nestjs/common';
import { EvolutionIndicator, Network, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

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

  async findByDates(init: Date, end: Date) {
    if (!init && !end) {
      const todayMinusOneYear = new Date();
      todayMinusOneYear.setFullYear(todayMinusOneYear.getFullYear() - 1);
      init = todayMinusOneYear;
      end = new Date();
    } else {
      init = new Date(init);
      end = new Date(end);
    }

    console.log('init', init.toLocaleString('pt-BR'));
    console.log('end', end.toLocaleString('pt-BR'));

    /* foi adicionado o aggregate para filtrar 
    somente os indicadores do último dia de cada mês. 
    Isso porque o serviço que insere os indicadores 
    está rodando diariamente */
    const ultimosIndicadoresPorMes = await this.prisma.$queryRaw`
    SELECT *
    FROM "evolution_indicators" i
    WHERE "createdAt" = (
      SELECT MAX("createdAt")
      FROM "evolution_indicators"
      WHERE date_trunc('month', i."createdAt") = date_trunc('month', "createdAt")
      AND "createdAt" >= to_timestamp(${init.toLocaleString('pt-BR')}, 'DD/MM/YYYY, HH24:MI:SS')
      AND "createdAt" <= to_timestamp(${end.toLocaleString('pt-BR')}, 'DD/MM/YYYY, HH24:MI:SS')
    )
  `;
    return ultimosIndicadoresPorMes;
  }

  async processIndicator(networks: Network[]) {
    this.logger.log('init process evolutions indicators');
    const indicatorsMap: Map<string, Prisma.EvolutionIndicatorCreateInput> = new Map();

    networks.map((network) => {
      if (!network.sourceType) {
        network.sourceType = 'Indefinido';
      }
      if (indicatorsMap.get(network.sourceType)) {
        indicatorsMap.get(network.sourceType).numberOfNetworks += 1;
        indicatorsMap.get(network.sourceType).numberOfDocuments += network.validSize;
      } else {
        const evolutionIndicador: Prisma.EvolutionIndicatorCreateInput = {
          sourceType: network.sourceType,
          numberOfNetworks: 1,
          numberOfDocuments: network.validSize,
        };
        indicatorsMap.set(network.sourceType, evolutionIndicador);
      }
    });
    const indicators = Array.from(indicatorsMap.values());
    await this.createMany(indicators);
    this.logger.log('process evolutions indicators successful!');
  }
}
