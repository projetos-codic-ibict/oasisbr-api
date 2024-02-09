/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { NetworksService } from './networks.service';
import { Network } from './schemas/network.schema';

@Controller('networks')
export class NetworksController {
  constructor(private readonly networksService: NetworksService) {}

  @Get()
  @ApiResponse({ status: 200, type: Network, isArray: true })
  async findAll(@Query('sourceType') sourceType, @Query('name') name): Promise<Network[]> {
    console.log('sourceType', sourceType);
    if (sourceType) {
      return this.networksService.findByNetworkBySourceType(sourceType);
    }
    return this.networksService.findAll();
  }

  @Get('/:name')
  @ApiResponse({ status: 200, type: Network })
  async findByName(@Param('name') name: string): Promise<Network> {
    return this.networksService.findByNetworkByName(name);
  }
}
