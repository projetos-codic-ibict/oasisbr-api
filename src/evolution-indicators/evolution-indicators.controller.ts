import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { EvolutionIndicatorsService } from './evolution-indicators.service';

@Controller('evolution-indicators')
export class EvolutionIndicatorsController {
  constructor(private readonly indicatorsService: EvolutionIndicatorsService) {}

  @Get()
  @ApiQuery({ name: 'init', required: false })
  @ApiQuery({ name: 'end', required: false })
  @ApiResponse({ status: 200, type: '', isArray: true })
  find(@Query('init') init: Date, @Query('end') end: Date) {
    return this.indicatorsService.findByDates(init, end);
  }
}
