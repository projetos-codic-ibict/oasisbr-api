import { Test, TestingModule } from '@nestjs/testing';
import { Model, Query } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { NetworksService } from './networks.service';
import { Network, NetworkDocument } from './schemas/network.schema';

describe('NetworksService', () => {
  let service: NetworksService;
  let sourceModel: Model<NetworkDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NetworksService,
        {
          provide: getModelToken(Network.name),
          useValue: Model,
        },
      ],
    }).compile();

    sourceModel = module.get<Model<NetworkDocument>>(
      getModelToken(Network.name),
    );
    service = module.get<NetworksService>(NetworksService);
  });

  describe('findAll', () => {
    it('should return an array of networks', async () => {
      const networks: Network[] = [
        {
          id: 99,
          issn: '99',
          name: 'name1',
          email: 'email@email.com',
          institution: 'institution',
          sourceType: 'Revista',
          sourceUrl: 'url',
          validSize: 10,
        },
        {
          id: 99,
          issn: '99',
          name: 'name2',
          email: 'email@email.com',
          institution: 'institution',
          sourceType: 'Revista',
          sourceUrl: 'url',
          validSize: 10,
        },
      ];
      jest.spyOn(sourceModel, 'find').mockReturnValue({
        collation: jest.fn().mockReturnValue({
          sort: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(networks as NetworkDocument[]),
          } as unknown),
        } as unknown),
      } as unknown as Query<NetworkDocument[], NetworkDocument>);
      expect(await service.findAll()).toBe(networks);
    });
  });
});
