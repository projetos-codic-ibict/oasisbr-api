import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { NetworksService } from './networks.service';
import { Network } from './schemas/network.schema';

@Controller('networks')
export class NetworksController {
  constructor (private readonly networksService: NetworksService) { }

  @Get()
  @ApiResponse({ status: 200, type: Network, isArray: true })
  async findAll(): Promise<Network[]> {
    return this.networksService.findAll();
  }

  @Get('/:id')
  @ApiResponse({ status: 200, type: Network })
  async findById(@Param('id') id: number): Promise<Network> {
    return this.networksService.findByNetworkById(id);
  }
}
