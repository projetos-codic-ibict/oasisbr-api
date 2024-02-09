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
          issn: 1,
          email: 1,
          sourceUrl: 1,
          uf: 1,
        },
      )
      .collation({ locale: 'pt' })
      .sort({ name: 1 })
      .exec();
  }

  findByNetworkBySourceType(sourceType: string): Promise<Network[]> {
    return this.networkModel.find({ sourceType: sourceType }).exec();
  }

  findByNetworkById(id: number): Network | PromiseLike<Network> {
    return this.networkModel.findOne({ id: id }).exec();
  }

  findByNetworkByName(name: string): Network | PromiseLike<Network> {
    return this.networkModel.findOne({ name: name }).exec();
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
    try {
      await this.removeAll();
      await this.createMany(networkDtos);
    } catch (err) {
      console.error(err);
    }
  }
}
