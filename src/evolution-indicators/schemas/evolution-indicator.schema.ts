import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type EvolutionIndicatorDocument = EvolutionIndicator & Document;

@Schema({ collection: 'evolution_indicators' })
export class EvolutionIndicator {
  @ApiProperty()
  @Prop({ required: true })
  sourceType: string;

  @ApiProperty()
  @Prop({ default: Date.now })
  createdAt: Date;

  @ApiProperty()
  @Prop({ required: true })
  numberOfNetworks: number;

  @ApiProperty()
  @Prop({ required: true })
  numberOfDocuments: number;
}

export const EvolutionIndicatorSchema =
  SchemaFactory.createForClass(EvolutionIndicator);
