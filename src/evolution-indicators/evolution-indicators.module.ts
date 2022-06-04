import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EvolutionIndicatorsController } from './evolution-indicators.controller';
import { EvolutionIndicatorsService } from './evolution-indicators.service';
import {
  EvolutionIndicator,
  EvolutionIndicatorSchema,
} from './schemas/evolution-indicator.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EvolutionIndicator.name, schema: EvolutionIndicatorSchema },
    ]),
  ],
  controllers: [EvolutionIndicatorsController],
  providers: [EvolutionIndicatorsService, Logger],
})
export class EvolutionIndicatorsModule {}
