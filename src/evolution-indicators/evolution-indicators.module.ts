import { Logger, Module } from '@nestjs/common';
import { EvolutionIndicatorsController } from './evolution-indicators.controller';
import { EvolutionIndicatorsService } from './evolution-indicators.service';

@Module({
  imports: [],
  controllers: [EvolutionIndicatorsController],
  providers: [EvolutionIndicatorsService, Logger],
})
export class EvolutionIndicatorsModule {}
