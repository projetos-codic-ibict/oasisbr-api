export class CreateIdDto {
  source: string;
  target: string;
  updatedAt: Date = new Date();

  constructor(source: string, target: string) {
    this.source = source;
    this.target = target;
  }
}
