import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type IdDocument = Id & Document;

@Schema()
export class Id {
  @ApiProperty()
  @Prop({ unique: true, required: true })
  source: string;

  @ApiProperty()
  @Prop({ required: true })
  target: string;

  @ApiProperty()
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const IdSchema = SchemaFactory.createForClass(Id);
