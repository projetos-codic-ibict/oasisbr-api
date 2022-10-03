import { Controller, Get, Param } from '@nestjs/common';
import { RecordsService } from './records.service';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Get()
  async getSize() {
    const size = await this.recordsService.getSize();
    return `Total de Records encontrados: ${size}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordsService.findOne(id);
  }
}
