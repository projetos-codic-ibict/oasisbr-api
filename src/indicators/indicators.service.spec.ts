// import { Test, TestingModule } from '@nestjs/testing';
// import { Model, Query } from 'mongoose';
// import { getModelToken } from '@nestjs/mongoose';
// import { IndicatorsService } from './indicators.service';
// import { Indicator, IndicatorDocument } from './schemas/indicator.schema';
// import { IndicatorType } from './enums/indicator-type.enum';
// import { HttpModule } from '@nestjs/axios';
// import { ConfigService } from '@nestjs/config';

// describe('IndicatorsService', () => {
//   let service: IndicatorsService;
//   let indicatorModel: Model<IndicatorDocument>;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [HttpModule],
//       providers: [
//         ConfigService,
//         IndicatorsService,
//         {
//           provide: getModelToken(Indicator.name),
//           useValue: Model,
//         },
//       ],
//     }).compile();

//     indicatorModel = module.get<Model<IndicatorDocument>>(
//       getModelToken(Indicator.name),
//     );
//     service = module.get<IndicatorsService>(IndicatorsService);
//   });

//   describe('findAll', () => {
//     it('should return an array of networks', async () => {
//       const indicators: Indicator[] = [
//         {
//           name: 'indicator1',
//           type: IndicatorType.SOURCE_TYPE,
//           updatedAt: new Date(),
//           value: 9,
//         },
//         {
//           name: 'indicator2',
//           type: IndicatorType.SOURCE_TYPE,
//           updatedAt: new Date(),
//           value: 10,
//         },
//         {
//           name: 'indicator3',
//           type: null,
//           updatedAt: new Date(),
//           value: 11,
//         },
//       ];
//       jest.spyOn(indicatorModel, 'find').mockReturnValue({
//         exec: jest.fn().mockResolvedValue(indicators as IndicatorDocument[]),
//       } as unknown as Query<IndicatorDocument[], IndicatorDocument>);

//       expect(await service.findAll()).toBe(indicators);
//     });
//   });
// });
