import { Module } from '@nestjs/common';
import { IdsService } from './ids.service';
import { IdsController } from './ids.controller';
import { Id, IdSchema } from './schemas/ids.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Id.name, schema: IdSchema }])],
  controllers: [IdsController],
  providers: [IdsService],
})
export class IdsModule {}
