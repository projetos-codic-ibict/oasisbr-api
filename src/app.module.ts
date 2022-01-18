import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NetworksModule } from './networks/networks.module';
import { EvolutionIndicatorsModule } from './evolution-indicators/evolution-indicators.module';
import { OasisbrModule } from './oasisbr/oasisbr.module';
import { ConfigModule } from '@nestjs/config';
import { IndicatorsModule } from './indicators/indicators.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        authSource: process.env.DATABASE_NAME,
        dbName: process.env.DATABASE_NAME,
        user: process.env.DATABASE_USER,
        pass: process.env.DATABASE_PASSWORD,
      },
    ),
    ScheduleModule.forRoot(),
    NetworksModule,
    EvolutionIndicatorsModule,
    IndicatorsModule,
    OasisbrModule,
  ],
  controllers: [AppController],
  providers: [Logger, AppService],
})
export class AppModule { }
