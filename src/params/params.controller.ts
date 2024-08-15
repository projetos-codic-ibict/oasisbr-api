import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ParamName } from './enums/param.enum';
import { ParamsService } from './params.service';

@Controller('params')
export class ParamsController {
  constructor(private readonly paramsService: ParamsService) {}

  @Get()
  @ApiQuery({ name: 'name', enum: ParamName, required: false })
  @ApiResponse({ status: 200, type: '' })
  find(@Query('name') name: ParamName) {
    if (name != null) {
      return this.paramsService.findByName(name);
    }
    return this.paramsService.findAll();
  }
}
