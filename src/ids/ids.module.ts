import { Module } from '@nestjs/common';
import { IdsController } from './ids.controller';
import { IdsService } from './ids.service';

@Module({
  imports: [],
  controllers: [IdsController],
  providers: [IdsService],
})
export class IdsModule {}
