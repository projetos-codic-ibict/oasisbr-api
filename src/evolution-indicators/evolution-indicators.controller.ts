import { Controller, Get, Query } from '@nestjs/common';
import { ApiProperty, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { EvolutionIndicator } from '@prisma/client';
import { EvolutionIndicatorsService } from './evolution-indicators.service';

class EvolutionIndicatorsType implements EvolutionIndicator {
  @ApiProperty()
  id: number;
  @ApiProperty()
  sourceType: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  numberOfNetworks: number;
  @ApiProperty()
  numberOfDocuments: number;
}

@Controller('evolution-indicators')
export class EvolutionIndicatorsController {
  constructor(private readonly indicatorsService: EvolutionIndicatorsService) {}

  @Get()
  @ApiQuery({ name: 'init', required: false })
  @ApiQuery({ name: 'end', required: false })
  @ApiResponse({ status: 200, type: EvolutionIndicatorsType, isArray: true })
  find(@Query('init') init: Date, @Query('end') end: Date) {
    console.info(`buscando indicadores de evolução de ${init} até ${end}`);
    return this.indicatorsService.findByDates(init, end);
  }
}
