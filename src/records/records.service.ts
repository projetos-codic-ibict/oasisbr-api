import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { RecordDto } from './dto/record.dto';
import { Record, RecordDocument } from './schemas/records.schema';

@Injectable()
export class RecordsService {
  constructor(@InjectModel(Record.name) private recordModel: Model<RecordDocument>) {}

  getSize(): Promise<number> {
    return this.recordModel.count({}).exec();
  }

  findOne(hotId: string): Promise<Record> {
    return this.recordModel.findOne({ hot_id: hotId }).exec();
  }
}
