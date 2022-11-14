import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'OasisBr API is Online: Version: 1.10.1';
  }
}
