import { Injectable } from '@nestjs/common';
import { Record } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RecordsService {
  constructor(private prisma: PrismaService) {}

  getSize(missed: boolean): Promise<number> {
    if (missed) {
      return this.prisma.record.count({
        where: { missed },
      });
    }
    return this.prisma.record.count({});
  }

  findOne(hotId: string): Promise<Record> {
    return this.prisma.record.findFirst({
      where: { hot_id: hotId },
    });
  }

  findMissed(): Promise<Record[]> {
    return this.prisma.record.findMany({
      where: { missed: true },
    });
  }
}
