import { HttpModule } from '@nestjs/axios';
import { Logger, Module } from '@nestjs/common';
import { IndicatorsController } from './indicators.controller';
import { IndicatorsService } from './indicators.service';

@Module({
  imports: [HttpModule, ,],
  controllers: [IndicatorsController],
  providers: [IndicatorsService, Logger],
})
export class IndicatorsModule {}
