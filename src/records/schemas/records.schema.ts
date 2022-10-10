import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type RecordDocument = Record & Document;

@Schema({ collection: 'records' })
export class Record {
  @ApiProperty()
  @Prop({ unique: true, required: true })
  brcris_id: string;

  @ApiProperty()
  @Prop({ unique: true, required: true })
  hot_id: string;

  @ApiProperty()
  missed: boolean;

  @ApiProperty()
  @Prop({ default: Date.now })
  created_at: Date;

  @ApiProperty()
  record: string;

  @ApiProperty()
  source_ids: [string];

  @ApiProperty()
  @Prop({ default: Date.now })
  updated_at: Date;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
