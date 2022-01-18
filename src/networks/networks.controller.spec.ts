import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { NetworksController } from './networks.controller';
import { NetworksService } from './networks.service';
import { Source } from './schemas/network.schema';

describe('NetworksController', () => {
  let controller: NetworksController;
  let networksService: NetworksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NetworksController],
      providers: [
        NetworksService,
        {
          provide: getModelToken(Source.name),
          useValue: Model,
        },
      ],
    }).compile();

    networksService = module.get<NetworksService>(NetworksService);
    controller = module.get<NetworksController>(NetworksController);
  });

  describe('findAll', () => {
    it('should return an array of networks', async () => {
      const networks: Source[] = [
        {
          id: 99,
          issn: '99',
          name: 'name',
          email: 'email@email.com',
          institution: 'institution',
          sourceType: 'Revista',
          sourceUrl: 'url',
          validSize: 10,
        },
      ];
      jest.spyOn(networksService, 'findAll').mockResolvedValue(networks);

      expect(await controller.findAll()).toBe(networks);
    });
  });
});
