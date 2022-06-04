import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ParamDocument = Param & Document;

@Schema()
export class Param {
  @ApiProperty()
  @Prop({ unique: true, required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  value: string;

  @ApiProperty()
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ParamSchema = SchemaFactory.createForClass(Param);
