import { Injectable, Logger } from '@nestjs/common';
import { Network } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NetworksService {
  constructor(
    private prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async create(network: Network) {
    await this.prisma.network.create({
      data: network,
    });
  }

  private async createMany(networks: Array<Network>) {
    await this.prisma.network.createMany({
      data: networks,
    });
    this.logger.log(`all networks created again`);
  }

  async findAll(): Promise<Network[]> {
    return this.prisma.network.findMany({
      orderBy: { name: 'asc' },
    });
  }

  findByNetworkBySourceType(sourceType: string): Promise<Network[]> {
    return this.prisma.network.findMany({
      where: {
        sourceType: sourceType,
      },
    });
  }

  findByNetworkById(id: number): Network | PromiseLike<Network> {
    return this.prisma.network.findUnique({
      where: {
        id,
      },
    });
  }

  findByNetworkByName(name: string): Network | PromiseLike<Network> {
    return this.prisma.network.findFirst({
      where: {
        name,
      },
    });
  }

  async update(id: number, network: Network) {
    await this.prisma.network.update({
      where: {
        id,
      },
      data: network,
    });
  }

  private async removeAll() {
    this.logger.log(`removing all networks`);
    await this.prisma.network.deleteMany({});
    this.logger.log(`all networks removed`);
  }

  async removeAllAndInsertAll(networks: Array<Network>) {
    try {
      await this.removeAll();
      await this.createMany(networks);
    } catch (err) {
      console.error(err);
    }
  }
}
