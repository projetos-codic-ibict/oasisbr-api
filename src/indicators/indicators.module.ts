import { Module, Logger } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { IndicatorsController } from './indicators.controller';
import { IndicatorsService } from './indicators.service';
import { Indicator, IndicatorSchema } from './schemas/indicator.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Indicator.name, schema: IndicatorSchema },
    ]),
  ],
  controllers: [IndicatorsController],
  providers: [IndicatorsService, Logger],
})
export class IndicatorsModule {}
