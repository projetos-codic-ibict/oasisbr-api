import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type NetworkDocument = Network & Document;

@Schema()
export class Network {
  @Prop({ unique: true, required: true })
  id: number;

  @ApiProperty()
  @Prop({ required: true })
  acronym: string;

  @ApiProperty()
  @Prop()
  issn: string;

  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  institution: string;

  @ApiProperty()
  @Prop()
  sourceType: string;

  @ApiProperty()
  @Prop()
  email: string;

  @ApiProperty()
  @Prop()
  sourceUrl: string;

  @ApiProperty()
  @Prop({ required: true })
  validSize: number;

  @ApiProperty()
  @Prop({ default: Date.now, required: true })
  updatedAt: Date;

  @ApiProperty()
  @Prop()
  uf: string;
}

export const NetworkSchema = SchemaFactory.createForClass(Network);
