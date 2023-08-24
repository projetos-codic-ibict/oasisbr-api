export class NetworkDto {
  id: number;
  acronym: string;
  issn: string;
  name: string;
  institution: string;
  sourceType: string;
  sourceUrl: string;
  email: string;
  validSize: number;
  updatedAt: Date = new Date();
  uf: string;
}
