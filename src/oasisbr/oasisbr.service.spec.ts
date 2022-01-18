import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { OasisbrService } from './oasisbr.service';
import { NetworksService } from '../networks/networks.service';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Network, NetworkDocument } from '../networks/schemas/network.schema';
import { getModelToken } from '@nestjs/mongoose';
import { IndicatorsService } from '../indicators/indicators.service';
import {
  Indicator,
  IndicatorDocument,
} from '../indicators/schemas/indicator.schema';
import { EvolutionIndicator } from '../evolution-indicators/schemas/evolution-indicator.schema';
import { EvolutionIndicatorsService } from '../evolution-indicators/evolution-indicators.service';

describe('OasisbrService', () => {
  let service: OasisbrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ConfigService,
        OasisbrService,
        NetworksService,
        IndicatorsService,
        EvolutionIndicatorsService,
        {
          provide: getModelToken(Source.name),
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
    module.get<Model<SourceDocument>>(getModelToken(Source.name));
    service = module.get<OasisbrService>(OasisbrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
