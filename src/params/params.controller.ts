import { Controller, Get, Query } from '@nestjs/common';
import { ApiProperty, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Param } from '@prisma/client';
import { ParamName } from './enums/param.enum';
import { ParamsService } from './params.service';

class ParamType implements Param {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  value: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

@Controller('params')
export class ParamsController {
  constructor(private readonly paramsService: ParamsService) {}

  @Get()
  @ApiQuery({ name: 'name', enum: ParamName, required: false })
  @ApiResponse({ status: 200, type: ParamType })
  find(@Query('name') name: ParamName) {
    if (name != null) {
      return this.paramsService.findByName(name);
    }
    return this.paramsService.findAll();
  }
}
