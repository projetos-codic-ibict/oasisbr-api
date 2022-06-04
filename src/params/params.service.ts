import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ParamDto } from './dto/param.dto';
import { ParamName } from './enums/param.enum';
import { Param, ParamDocument } from './schemas/param.schema';

@Injectable()
export class ParamsService {
  constructor(
    @InjectModel(Param.name) private paramModel: Model<ParamDocument>,
  ) {}

  findAll() {
    return this.paramModel.find({}, 'name value').exec();
  }

  findByName(name: ParamName) {
    return this.paramModel
      .findOne({ name: name }, { _id: 0, name: 1, value: 1 })
      .exec();
  }

  async update(name: ParamName, paramDto: ParamDto) {
    await this.paramModel.updateOne({ name: name }, paramDto, {
      upsert: true,
    });
  }
}
