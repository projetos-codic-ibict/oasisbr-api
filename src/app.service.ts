import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Oasisbr API is Online: Version: 1.10.2';
  }
}
