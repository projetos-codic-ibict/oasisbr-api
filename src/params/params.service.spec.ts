import { Test, TestingModule } from '@nestjs/testing';
import { ParamsService } from './params.service';

describe('ParamsService', () => {
  let service: ParamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParamsService],
    }).compile();

    service = module.get<ParamsService>(ParamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
