/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { Network } from '@prisma/client';
import { NetworksService } from './networks.service';

class NetworkType implements Network {
  @ApiProperty()
  id: number;
  @ApiProperty()
  acronym: string;
  @ApiProperty()
  issn: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  institution: string;
  @ApiProperty()
  sourceType: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  sourceUrl: string;
  @ApiProperty()
  validSize: number;
  @ApiProperty()
  uf: string;
  @ApiProperty()
  updatedAt: Date;
}

@Controller('networks')
export class NetworksController {
  constructor(private readonly networksService: NetworksService) {}

  @Get()
  @ApiResponse({ status: 200, type: NetworkType, isArray: true })
  async findAll(@Query('sourceType') sourceType, @Query('name') name): Promise<Network[]> {
    console.log('sourceType', sourceType);
    if (sourceType) {
      return this.networksService.findByNetworkBySourceType(sourceType);
    }
    return this.networksService.findAll();
  }

  @Get('/:name')
  @ApiResponse({ status: 200, type: NetworkType })
  async findByName(@Param('name') name: string): Promise<Network> {
    return this.networksService.findByNetworkByName(name);
  }
}
