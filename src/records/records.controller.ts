import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Record } from '@prisma/client';
import { RecordsService } from './records.service';

class RecordType implements Record {
  @ApiProperty()
  brcris_id: string;
  @ApiProperty()
  hot_id: string;
  @ApiProperty()
  missed: boolean;
  @ApiProperty()
  created_at: Date;
  @ApiProperty()
  record: string;
  @ApiProperty()
  source_ids: string[];
  @ApiProperty()
  updated_at: Date;
}

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Get('/size')
  @ApiResponse({ status: 200, type: Number })
  async getSize(@Query('missed') missed: boolean) {
    console.log('size');
    const size = await this.recordsService.getSize(missed ? /true/.test(missed.toString()) : null);
    return `Total de Records encontrados: ${size}`;
  }

  @Get('/missed')
  @ApiResponse({ status: 200, type: RecordType, isArray: true })
  async getMissed() {
    console.log('getMissed');
    const records = await this.recordsService.findMissed();
    return records;
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: RecordType })
  findOne(@Param('id') id: string) {
    console.log('findOne');
    return this.recordsService.findOne(id);
  }
}
