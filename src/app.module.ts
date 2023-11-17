/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
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
        connectionFactory: (connection) => {
          connection.on('connected', () => {
            console.log('DB is connected');
          });
          connection.on('disconnected', () => {
            console.log('DB disconnected');
          });
          connection.on('error', (error) => {
            console.log('DB connection failed! for error: ', error);
          });
          connection._events.connected();
          return connection;
        },
      },
    ),
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
