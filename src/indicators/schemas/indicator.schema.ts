import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { IndicatorType } from '../enums/indicator-type.enum';

export type IndicatorDocument = Indicator & Document;

@Schema()
export class Indicator {
  @ApiProperty()
  @Prop({ unique: true, required: true })
  name: string;

  @ApiProperty({ enum: IndicatorType })
  @Prop({ required: true })
  type: IndicatorType;

  @ApiProperty()
  @Prop({ required: true })
  value: number;

  @ApiProperty()
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const IndicatorSchema = SchemaFactory.createForClass(Indicator);
