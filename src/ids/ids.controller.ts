import { Controller, Get, Param } from '@nestjs/common';
import { ApiProperty, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Id } from '@prisma/client';
import { IdsService } from './ids.service';

class IdType implements Id {
  @ApiProperty()
  target: string;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  id: number;
  @ApiProperty()
  source: string;
  @ApiProperty()
  createdAt: Date;
}

@Controller('ids')
export class IdsController {
  constructor(private readonly idsService: IdsService) {}

  // @Get()
  // @ApiResponse({ status: 200, type: IdType, isArray: true })
  // findAll() {
  //   return this.idsService.findAll();
  // }

  @Get('/size')
  @ApiResponse({ status: 200, type: Number })
  async getSize() {
    const size = await this.idsService.getSize();
    return `Total de Records encontrados: ${size}`;
  }

  @Get(':id')
  @ApiQuery({ name: 'source', required: true })
  @ApiResponse({ status: 200, type: IdType })
  findOne(@Param('id') source: string) {
    return this.idsService.findOne(source);
  }
}
