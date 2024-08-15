import { Logger, Module } from '@nestjs/common';
import { EvolutionIndicatorsController } from './evolution-indicators.controller';
import { EvolutionIndicatorsService } from './evolution-indicators.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [EvolutionIndicatorsController],
  providers: [EvolutionIndicatorsService, PrismaService, Logger],
})
export class EvolutionIndicatorsModule {}
