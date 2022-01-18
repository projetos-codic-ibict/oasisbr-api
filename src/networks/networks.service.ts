import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NetworkDto } from './dto/network.dto';
import { Network, NetworkDocument } from './schemas/network.schema';

@Injectable()
export class NetworksService {
  constructor(
    @InjectModel(Network.name)
    private networkModel: Model<NetworkDocument>,
  ) { }

  async create(networkDto: NetworkDto) {
    const network = new this.networkModel(networkDto);
    await network.save();
  }

  async createMany(networkDtos: Array<NetworkDto>) {
    await this.networkModel.insertMany(networkDtos);
  }

  async findAll(): Promise<Network[]> {
    return this.networkModel
      .find(
        {},
        {
          _id: 0,
          issn: 1,
          name: 1,
          institution: 1,
          sourceUrl: 1,
          sourceType: 1,
          email: 1,
          validSize: 1,
        },
      )
      .collation({ locale: 'pt' })
      .sort({ name: 1 })
      .exec();
  }

  findByNetworkName(name: string): Network | PromiseLike<Network> {
    return this.networkModel.findOne({ name: name }).exec()
  }

  async update(id: number, networkDto: NetworkDto) {
    await this.networkModel.updateOne({ id: id }, networkDto, { upsert: true });
  }
}
