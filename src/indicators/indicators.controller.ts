import { Controller, Get, Query } from '@nestjs/common';
import { ApiProperty, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Indicator } from '@prisma/client';
import { IndicatorType } from './enums/indicator-type.enum';
import { IndicatorsService } from './indicators.service';

class IndicatorApiType implements Indicator {
  @ApiProperty()
  name: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  value: number;
  @ApiProperty()
  updatedAt: Date;
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

@Controller('indicators')
export class IndicatorsController {
  constructor(private readonly indicatorsService: IndicatorsService) {}

  @Get()
  @ApiQuery({ name: 'type', enum: IndicatorType, required: false })
  @ApiResponse({ status: 200, type: IndicatorApiType, isArray: true })
  find(@Query('type') type: IndicatorType) {
    if (type === IndicatorType.SOURCE_TYPE) {
      return this.indicatorsService.findByType(type);
    }
    return this.indicatorsService.findAll();
  }
}
