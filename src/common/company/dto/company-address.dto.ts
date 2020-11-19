import { ApiProperty } from '@nestjs/swagger';
import { CompanyRO } from './company.dto';

export class CompanyAddressDTO {
  @ApiProperty({ required: true }) type: number;
  @ApiProperty({ required: true }) companyId: number;
  @ApiProperty({ required: false }) addrNo: string;
  @ApiProperty({ required: false }) village: string;
  @ApiProperty({ required: false }) building: string;
  @ApiProperty({ required: false }) room: string;
  @ApiProperty({ required: false }) soi: string;
  @ApiProperty({ required: false }) road: string;
  @ApiProperty({ required: true }) subDistictId: number;
  @ApiProperty({ required: true }) districtId: number;
  @ApiProperty({ required: true }) provinceId: number;
  @ApiProperty({ required: true }) zipcode: number;
  @ApiProperty({ required: true }) countryId: number;
}

// tslint:disable-next-line: max-classes-per-file
export class CompanyAddressRO {
  type: number;
  companyId: CompanyRO;
  addrNo: string;
  village: string;
  building: string;
  room: string;
  soi: string;
  road: string;
  subDistictId: number;
  districtId: number;
  provinceId: number;
  zipcode: number;
  countryId: number;
}
