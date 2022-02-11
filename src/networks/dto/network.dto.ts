export class NetworkDto {
  id: number;
  network_name_str;
  issn: string;
  name: string;
  institution: string;
  sourceType: string;
  sourceUrl: string;
  email: string;
  validSize: number;
  updatedAt: Date = new Date();
}
