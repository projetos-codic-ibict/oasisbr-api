import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NetworkDto } from './dto/network.dto';
import { Network, NetworkDocument } from './schemas/network.schema';

@Injectable()
export class NetworksService {
  constructor(
    @InjectModel(Network.name)
    private networkModel: Model<NetworkDocument>,
    private readonly logger: Logger,
  ) {}

  async create(networkDto: NetworkDto) {
    const network = new this.networkModel(networkDto);
    await network.save();
  }

  private async createMany(networkDtos: Array<NetworkDto>) {
    await this.networkModel.insertMany(networkDtos);
    this.logger.log(`all networks created again`);
  }

  async findAll(): Promise<Network[]> {
    return this.networkModel
      .find(
        {},
        {
          id: 1,
          acronym: 1,
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

  private async removeAll() {
    this.logger.log(`removing all networks`);
    await this.networkModel.deleteMany();
    this.logger.log(`all networks removed`);
  }

  async removeAllAndInsertAll(networkDtos: Array<NetworkDto>) {
    await this.removeAll();
    await this.createMany(networkDtos);
  }
}
