import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ParamName } from './enums/param.enum';

@Injectable()
export class ParamsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.param.findMany({});
  }

  findByName(name: ParamName) {
    return this.prisma.param.findFirst({
      where: {
        name,
      },
    });
  }

  async update(name: ParamName, param: Prisma.ParamCreateInput) {
    try {
      console.log(`>>> ${name} && ${param}`);
      if (name && param) {
        await this.prisma.param.upsert({
          where: {
            name,
          },
          update: { ...param },
          create: { ...param },
        });
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }
}
