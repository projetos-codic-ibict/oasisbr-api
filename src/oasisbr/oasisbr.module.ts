import { HttpModule } from '@nestjs/axios';
import { Logger, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { EvolutionIndicatorsModule } from '../evolution-indicators/evolution-indicators.module';
import { EvolutionIndicatorsService } from '../evolution-indicators/evolution-indicators.service';
import { IndicatorsModule } from '../indicators/indicators.module';
import { IndicatorsService } from '../indicators/indicators.service';
import { NetworksModule } from '../networks/networks.module';
import { NetworksService } from '../networks/networks.service';
import { ParamsService } from '../params/params.service';
import { OasisbrService } from './oasisbr.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 120000,
        maxRedirects: 5,
      }),
    }),
    NetworksModule,
    IndicatorsModule,
    EvolutionIndicatorsModule,
  ],
  controllers: [],
  providers: [
    OasisbrService,
    NetworksService,
    IndicatorsService,
    EvolutionIndicatorsService,
    ParamsService,
    PrismaService,
    Logger,
  ],
})
export class OasisbrModule {}
