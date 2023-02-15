/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { NetworksService } from './networks.service';
import { Network } from './schemas/network.schema';

@Controller('networks')
export class NetworksController {
  constructor(private readonly networksService: NetworksService) {}

  @Get()
  @ApiResponse({ status: 200, type: Network, isArray: true })
  async findAll(): Promise<Network[]> {
    return this.networksService.findAll();
  }

  // @Get('/:id')
  // @ApiResponse({ status: 200, type: Network })
  // async findById(@Param('id') id: number): Promise<Network> {
  //   if (isNaN(id)) {
  //     return new Network();
  //   }
  //   return this.networksService.findByNetworkById(id);
  // }

  @Get('/:name')
  @ApiResponse({ status: 200, type: Network })
  async findByName(@Param('name') name: string): Promise<Network> {
    return this.networksService.findByNetworkByName(name);
  }
}
