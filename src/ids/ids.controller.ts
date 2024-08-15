import { Controller, Get, Param } from '@nestjs/common';
import { IdsService } from './ids.service';

@Controller('ids')
export class IdsController {
  constructor(private readonly idsService: IdsService) {}

  @Get()
  findAll() {
    return this.idsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') source: string) {
    return this.idsService.findOne(source);
  }
}
