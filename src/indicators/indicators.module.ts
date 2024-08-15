import { HttpModule } from '@nestjs/axios';
import { Logger, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IndicatorsController } from './indicators.controller';
import { IndicatorsService } from './indicators.service';

@Module({
  imports: [HttpModule],
  controllers: [IndicatorsController],
  providers: [IndicatorsService, PrismaService, Logger],
})
export class IndicatorsModule {}
