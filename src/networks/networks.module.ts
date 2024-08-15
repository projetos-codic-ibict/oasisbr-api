import { Logger, Module } from '@nestjs/common';
import { NetworksController } from './networks.controller';
import { NetworksService } from './networks.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [NetworksController],
  providers: [NetworksService, PrismaService, Logger],
})
export class NetworksModule {}
