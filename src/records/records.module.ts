import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';

@Module({
  imports: [],
  controllers: [RecordsController],
  providers: [RecordsService, PrismaService],
})
export class RecordsModule {}
