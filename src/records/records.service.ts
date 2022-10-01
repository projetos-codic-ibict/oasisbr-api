import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { RecordDto } from './dto/record.dto';
import { Record, RecordDocument } from './schemas/records.schema';

@Injectable()
export class RecordsService {
  constructor(
    @InjectModel(Record.name) private recordModel: Model<RecordDocument>,
  ) {}

  findAll() {
    return this.recordModel.find({}).exec();
  }

  findOne(hotId: string) {
    return this.recordModel.findOne({ brcris_id: hotId }).exec();
  }
}
