import { Test, TestingModule } from '@nestjs/testing';
import { IdsController } from './ids.controller';
import { IdsService } from './ids.service';

describe('IdsController', () => {
  let controller: IdsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdsController],
      providers: [IdsService],
    }).compile();

    controller = module.get<IdsController>(IdsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
