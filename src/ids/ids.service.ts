import { Injectable } from '@nestjs/common';
import { Id } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class IdsService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<Id[]> {
    return this.prisma.id.findMany({});
  }

  findOne(source: string): Promise<Id | null> {
    return this.prisma.id.findFirst({
      where: { source },
    });
  }
}
