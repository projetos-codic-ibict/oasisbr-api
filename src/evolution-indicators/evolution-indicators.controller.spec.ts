// import { Test, TestingModule } from '@nestjs/testing';
// import { Model } from 'mongoose';
// import { getModelToken } from '@nestjs/mongoose';
// import { EvolutionIndicatorsService } from './evolution-indicators.service';
// import {
//   EvolutionIndicator,
//   EvolutionIndicatorDocument,
// } from './schemas/evolution-indicator.schema';
// import { EvolutionIndicatorsController } from './evolution-indicators.controller';

// describe('IndicatorsController', () => {
//   let controller: EvolutionIndicatorsController;
//   let indicatorsService: EvolutionIndicatorsService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [EvolutionIndicatorsController],
//       providers: [
//         EvolutionIndicatorsService,
//         {
//           provide: getModelToken(EvolutionIndicator.name),
//           useValue: Model,
//         },
//       ],
//     }).compile();

//     module.get<Model<EvolutionIndicatorDocument>>(
//       getModelToken(EvolutionIndicator.name),
//     );
//     indicatorsService = module.get<EvolutionIndicatorsService>(
//       EvolutionIndicatorsService,
//     );
//     controller = module.get<EvolutionIndicatorsController>(
//       EvolutionIndicatorsController,
//     );
//   });

//   describe('find', () => {
//     const indicators: EvolutionIndicator[] = [
//       {
//         sourceType: 'indicator1',
//         numberOfNetworks: 10,
//         numberOfDocuments: 100,
//         createdAt: new Date(),
//       },
//       {
//         sourceType: 'indicator2',
//         numberOfNetworks: 10,
//         numberOfDocuments: 100,
//         createdAt: new Date(),
//       },
//       {
//         sourceType: 'indicator3',
//         numberOfNetworks: 10,
//         numberOfDocuments: 100,
//         createdAt: new Date(),
//       },
//     ];
//     it('should return an array of all networks', async () => {
//       jest
//         .spyOn(indicatorsService, 'findByDates')
//         .mockResolvedValue(indicators);

//       expect(await controller.find(null, null)).toBe(indicators);
//     });
//   });
// });
