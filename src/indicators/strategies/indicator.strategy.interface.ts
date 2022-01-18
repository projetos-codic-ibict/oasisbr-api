import { NetworkDto } from '../../networks/dto/network.dto';

export interface IndicatorStrategy {
  processIndicator(networkDtos: Array<NetworkDto>);
}
