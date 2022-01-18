import { IndicatorType } from '../enums/indicator-type.enum';

export class IndicatorDto {
  name: string;
  type: IndicatorType;
  value: number;
  updateAt: Date;

  constructor(name: string, value: number, type: IndicatorType) {
    this.name = name;
    this.value = value;
    this.type = type;
  }
}
