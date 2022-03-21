import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { INestApplication, Logger } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import {
  MongooseTestModule,
  closeMongoTestConnection,
} from '../src/utils/MongooseTestModule';
import { ConfigService } from '@nestjs/config';
import { OasisbrService } from '../src/oasisbr/oasisbr.service';
import { NetworksService } from '../src/networks/networks.service';
import {
  Network,
  NetworkDocument,
} from '../src/networks/schemas/network.schema';
import { Model } from 'mongoose';
import { HttpModule } from '@nestjs/axios';
import { IndicatorsService } from '../src/indicators/indicators.service';
import { EvolutionIndicatorsService } from '../src/evolution-indicators/evolution-indicators.service';
import { EvolutionIndicator } from '../src/evolution-indicators/schemas/evolution-indicator.schema';
import { Indicator } from '../src/indicators/schemas/indicator.schema';

describe('/indicators (Indicadors endpoint)', () => {
  let app: INestApplication;
  let oasisService: OasisbrService;

  beforeAll(async () => {
    await MongoMemoryServer.create({
      instance: { dbName: 'oasisbr_test' },
    });
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MongooseTestModule(), HttpModule, AppModule],
      providers: [
        ConfigService,
        OasisbrService,
        NetworksService,
        IndicatorsService,
        EvolutionIndicatorsService,
        Logger,
        {
          provide: getModelToken(Network.name),
          useValue: Model,
        },
        {
          provide: getModelToken(Indicator.name),
          useValue: Model,
        },
        {
          provide: getModelToken(EvolutionIndicator.name),
          useValue: Model,
        },
      ],
    }).compile();

    moduleFixture.get<Model<NetworkDocument>>(getModelToken(Network.name));
    oasisService = moduleFixture.get<OasisbrService>(OasisbrService);
    app = moduleFixture.createNestApplication();
    await app.init();
    oasisService.loadOasisbrNetworks();
  });

  afterAll(async () => {
    await closeMongoTestConnection();
  });

  it('GET all indicators', async () => {
    const response = await request(app.getHttpServer()).get('/indicators');
    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(11);
  });
});

// https://github.com/Webeleon/testing-nestjs-with-mongoose-and-mongod-in-memory
