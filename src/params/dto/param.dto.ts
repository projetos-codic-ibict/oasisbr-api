export class ParamDto {
  name: string;
  value: string;
  updatedAt: Date = new Date();

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}
