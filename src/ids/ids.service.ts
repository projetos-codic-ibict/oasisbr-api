import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Id, IdDocument } from './schemas/ids.schema';

@Injectable()
export class IdsService {
  constructor(@InjectModel(Id.name) private idModel: Model<IdDocument>) {}

  // create(createIdDto: CreateIdDto) {
  //   return 'This action adds a new id';
  // }

  findAll() {
    return this.idModel.find({}, 'source target').exec();
  }

  findOne(source: string) {
    return this.idModel
      .findOne({ source: source }, { _id: 0, source: 1, target: 1 })
      .exec();
  }
}
