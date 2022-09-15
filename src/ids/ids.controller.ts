import { Controller, Get, Param } from '@nestjs/common';
import { IdsService } from './ids.service';

@Controller('ids')
export class IdsController {
  constructor(private readonly idsService: IdsService) {}

  // @Post()
  // create(@Body() createIdDto: CreateIdDto) {
  //   return this.idsService.create(createIdDto);
  // }

  @Get()
  findAll() {
    return this.idsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') source: string) {
    return this.idsService.findOne(source);
  }
}
