export class EvolutionIndicatorDto {
  sourceType: string;
  numberOfNetworks: number;
  numberOfDocuments: number;

  constructor(
    sourceType: string,
    numberOfNetworks: number,
    numberOfDocuments: number,
  ) {
    this.sourceType = sourceType;
    this.numberOfNetworks = numberOfNetworks;
    this.numberOfDocuments = numberOfDocuments;
  }
}
