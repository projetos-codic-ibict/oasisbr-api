import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EvolutionIndicatorsModule } from './evolution-indicators/evolution-indicators.module';
import { IdsModule } from './ids/ids.module';
import { IndicatorsModule } from './indicators/indicators.module';
import { NetworksModule } from './networks/networks.module';
import { OasisbrModule } from './oasisbr/oasisbr.module';
import { ParamsModule } from './params/params.module';
import { RecordsModule } from './records/records.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    NetworksModule,
    EvolutionIndicatorsModule,
    IndicatorsModule,
    OasisbrModule,
    ParamsModule,
    IdsModule,
    RecordsModule,
  ],
  controllers: [AppController],
  providers: [Logger, AppService],
})
export class AppModule {}
