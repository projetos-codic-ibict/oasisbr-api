import { Module } from '@nestjs/common';
import { ParamsController } from './params.controller';
import { ParamsService } from './params.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [ParamsController],
  providers: [ParamsService, PrismaService],
})
export class ParamsModule {}
