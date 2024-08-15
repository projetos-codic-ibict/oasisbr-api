// import { Test, TestingModule } from '@nestjs/testing';
// import { Model } from 'mongoose';
// import { getModelToken } from '@nestjs/mongoose';
// import { IndicatorsController } from './indicators.controller';
// import { IndicatorsService } from './indicators.service';
// import { Indicator, IndicatorDocument } from './schemas/indicator.schema';
// import { IndicatorType } from './enums/indicator-type.enum';
// import { HttpModule } from '@nestjs/axios';
// import { ConfigService } from '@nestjs/config';

// describe('IndicatorsController', () => {
//   let controller: IndicatorsController;
//   let indicatorsService: IndicatorsService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [HttpModule],
//       controllers: [IndicatorsController],
//       providers: [
//         IndicatorsService,
//         ConfigService,
//         {
//           provide: getModelToken(Indicator.name),
//           useValue: Model,
//         },
//       ],
//     }).compile();

//     module.get<Model<IndicatorDocument>>(getModelToken(Indicator.name));
//     indicatorsService = module.get<IndicatorsService>(IndicatorsService);
//     controller = module.get<IndicatorsController>(IndicatorsController);
//   });

//   describe('find', () => {
//     const indicators: Indicator[] = [
//       {
//         name: 'indicator1',
//         type: IndicatorType.SOURCE_TYPE,
//         updatedAt: new Date(),
//         value: 9,
//       },
//       {
//         name: 'indicator2',
//         type: null,
//         updatedAt: new Date(),
//         value: 10,
//       },
//       {
//         name: 'indicator3',
//         type: IndicatorType.SOURCE_TYPE,
//         updatedAt: new Date(),
//         value: 11,
//       },
//     ];
//     it('should return an array of all networks', async () => {
//       jest.spyOn(indicatorsService, 'findAll').mockResolvedValue(indicators);

//       expect(await controller.find(null)).toBe(indicators);
//     });

//     it('should return an array of networks of type SOURCE_TYPE', async () => {
//       const indicatorsType0 = indicators.filter(
//         (indicator) => indicator.type === IndicatorType.SOURCE_TYPE,
//       );

//       jest
//         .spyOn(indicatorsService, 'findByType')
//         .mockResolvedValue(indicatorsType0);

//       expect(await controller.find(IndicatorType.SOURCE_TYPE)).toBe(
//         indicatorsType0,
//       );
//     });
//   });
// });
