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
  ) {}

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
          id: 1,
          name: 1,
          institution: 1,
          validSize: 1,
          sourceType: 1,
        },
      )
      .collation({ locale: 'pt' })
      .sort({ name: 1 })
      .exec();
  }

  findByNetworkById(id: number): Network | PromiseLike<Network> {
    return this.networkModel.findOne({ id: id }).exec();
  }

  async update(id: number, networkDto: NetworkDto) {
    await this.networkModel.updateOne({ id: id }, networkDto, { upsert: true });
  }
}
