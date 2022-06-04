import { Module } from '@nestjs/common';
import { ParamsService } from './params.service';
import { ParamsController } from './params.controller';
import { Param, ParamSchema } from './schemas/param.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Param.name, schema: ParamSchema }]),
  ],
  controllers: [ParamsController],
  providers: [ParamsService],
})
export class ParamsModule {}
