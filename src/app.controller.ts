import { Controller, Get, Logger } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'OasisBr API is Online',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
