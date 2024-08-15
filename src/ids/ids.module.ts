import { Module } from '@nestjs/common';
import { IdsController } from './ids.controller';
import { IdsService } from './ids.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [IdsController],
  providers: [IdsService, PrismaService],
})
export class IdsModule {}
