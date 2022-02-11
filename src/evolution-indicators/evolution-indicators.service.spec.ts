import { Test, TestingModule } from '@nestjs/testing';
import { Model, Query } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { EvolutionIndicatorsService } from './evolution-indicators.service';
import {
  EvolutionIndicator,
  EvolutionIndicatorDocument,
} from './schemas/evolution-indicator.schema';

describe('IndicatorsService', () => {
  let service: EvolutionIndicatorsService;
  let indicatorModel: Model<EvolutionIndicatorDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvolutionIndicatorsService,
        {
          provide: getModelToken(EvolutionIndicator.name),
          useValue: Model,
        },
      ],
    }).compile();

    indicatorModel = module.get<Model<EvolutionIndicatorDocument>>(
      getModelToken(EvolutionIndicator.name),
    );
    service = module.get<EvolutionIndicatorsService>(
      EvolutionIndicatorsService,
    );
  });

  describe('findAll', () => {
    it('should return an array of networks', async () => {
      const indicators: EvolutionIndicator[] = [
        {
          sourceType: 'indicator1',
          numberOfNetworks: 10,
          numberOfDocuments: 100,
          createdAt: new Date(),
        },
        {
          sourceType: 'indicator2',
          numberOfNetworks: 10,
          numberOfDocuments: 100,
          createdAt: new Date(),
        },
        {
          sourceType: 'indicator3',
          numberOfNetworks: 10,
          numberOfDocuments: 100,
          createdAt: new Date(),
        },
      ];
      jest.spyOn(indicatorModel, 'find').mockReturnValue({
        collation: jest.fn().mockReturnValue({
          sort: jest.fn().mockReturnValue({
            exec: jest
              .fn()
              .mockResolvedValue(indicators as EvolutionIndicatorDocument[]),
          } as unknown),
        } as unknown),
      } as unknown as Query<EvolutionIndicatorDocument[], EvolutionIndicatorDocument>);

      expect(await service.findAll()).toBe(indicators);
    });
  });
});
