import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { IndicatorType } from './enums/indicator-type.enum';
import { IndicatorsService } from './indicators.service';

@Controller('indicators')
export class IndicatorsController {
  constructor(private readonly indicatorsService: IndicatorsService) {}

  @Get()
  @ApiQuery({ name: 'type', enum: IndicatorType, required: false })
  @ApiResponse({ status: 200, type: '', isArray: true })
  find(@Query('type') type: IndicatorType) {
    if (type === IndicatorType.SOURCE_TYPE) {
      return this.indicatorsService.findByType(type);
    }
    return this.indicatorsService.findAll();
  }
}
