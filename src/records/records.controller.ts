import { Controller, Get, Param } from '@nestjs/common';
import { RecordsService } from './records.service';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Get()
  findAll() {
    return this.recordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('id: ', id);
    return this.recordsService.findOne(id);
  }
}
