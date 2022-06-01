import { Logger, Module } from '@nestjs/common';
import { NetworksService } from './networks.service';
import { NetworksController } from './networks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Network, NetworkSchema } from './schemas/network.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Network.name, schema: NetworkSchema }]),
  ],
  controllers: [NetworksController],
  providers: [NetworksService, Logger],
})
export class NetworksModule {}
