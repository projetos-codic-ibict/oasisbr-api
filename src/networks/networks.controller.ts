/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Network } from '@prisma/client';
import { NetworksService } from './networks.service';

class NetworkType implements Network {
  id: number;
  acronym: string;
  issn: string;
  name: string;
  institution: string;
  sourceType: string;
  email: string;
  sourceUrl: string;
  validSize: number;
  uf: string;
  updatedAt: Date;
}

@Controller('networks')
export class NetworksController {
  constructor(private readonly networksService: NetworksService) {}

  @Get()
  @ApiResponse({ status: 200, type: '', isArray: true })
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
