import { Test, TestingModule } from '@nestjs/testing';
import { ParamsController } from './params.controller';
import { ParamsService } from './params.service';

describe('ParamsController', () => {
  let controller: ParamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParamsController],
      providers: [ParamsService],
    }).compile();

    controller = module.get<ParamsController>(ParamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
