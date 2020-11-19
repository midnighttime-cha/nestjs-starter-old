import { ApiProperty } from '@nestjs/swagger';
import { ProvinceRO } from './md-province.dto';
import { GeographyRO } from './md-geography.dto';
import { CountryRO } from './md-countries.dto';

export class DistrictDTO {
  @ApiProperty() nameTH: string;
  @ApiProperty({ required: false }) nameEN: string;
  @ApiProperty({ required: false }) nameCN: string;
  @ApiProperty({ required: false }) provinceId: number;
  @ApiProperty({ required: false }) geoId: number;
  @ApiProperty({ required: false }) countryId: number;
  @ApiProperty({ required: false }) sizeArea: number;
}

// tslint:disable-next-line: max-classes-per-file
export class DistrictRO {
  nameTH: string;
  nameEN: string;
  nameCN: string;
  provinceId: ProvinceRO;
  geoId: GeographyRO;
  countryId: CountryRO;
  sizeArea: number;
}
