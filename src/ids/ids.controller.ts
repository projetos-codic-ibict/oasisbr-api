import { Controller, Get, Param } from '@nestjs/common';
import { IdsService } from './ids.service';

@Controller('ids')
export class IdsController {
  constructor(private readonly idsService: IdsService) {}

  @Get('/size')
  async getSize() {
    const size = await this.idsService.getSize();
    return `Total de Ids encontrados: ${size}`;
  }

  @Get()
  findAll() {
    return this.idsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') source: string) {
    return this.idsService.findOne(source);
  }
}
