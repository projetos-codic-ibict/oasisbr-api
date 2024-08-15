import { Network } from '@prisma/client';

export interface IndicatorStrategy {
  processIndicator(networks: Array<Network>);
}
