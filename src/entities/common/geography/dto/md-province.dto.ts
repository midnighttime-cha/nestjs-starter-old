import { ApiProperty } from '@nestjs/swagger';
import { GeographyRO } from './md-geography.dto';

export class ProvinceDTO {
  @ApiProperty() nameTH: string;
  @ApiProperty({ required: false }) nameEN: string;
  @ApiProperty({ required: false }) nameCN: string;
  @ApiProperty({ required: false }) geographyId: number;
  @ApiProperty({ required: false }) sizeArea: number;
  @ApiProperty({ required: false }) countryId: number;
}

// tslint:disable-next-line: max-classes-per-file
export class ProvinceRO {
  nameTH: string;
  nameEN: string;
  nameCN: string;
  geographyId: GeographyRO;
  sizeArea: number;
  countryId: number;
}
