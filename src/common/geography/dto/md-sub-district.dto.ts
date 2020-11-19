import { ApiProperty } from '@nestjs/swagger';
import { DistrictRO } from './md-district.dto';
import { ProvinceRO } from './md-province.dto';
import { GeographyRO } from './md-geography.dto';
import { CountryRO } from './md-countries.dto';

export class SubDistrictDTO {
  @ApiProperty() nameTH: string;
  @ApiProperty() nameEN: string;
  @ApiProperty() nameCN: string;
  @ApiProperty() lattitude: string;
  @ApiProperty() longtitude: string;
  @ApiProperty() sizeArea: number;
  @ApiProperty() districtId: number;
  @ApiProperty() provinceId: number;
  @ApiProperty() geographyId: number;
  @ApiProperty() countryId: number;
}

// tslint:disable-next-line: max-classes-per-file
export class SubDistrictRO {
  nameTH: string;
  nameEN: string;
  nameCN: string;
  lattitude: string;
  longtitude: string;
  sizeArea: number;
  districtId: DistrictRO;
  provinceId: ProvinceRO;
  geographyId: GeographyRO;
  countryId: CountryRO;
}
