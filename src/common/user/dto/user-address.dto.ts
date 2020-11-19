import { ApiProperty } from '@nestjs/swagger';
import { UserRO } from './user.dto';

export class UserAddressDTO {
  @ApiProperty({ required: true }) type: number;
  @ApiProperty({ required: true }) userId: number;
  @ApiProperty({ required: false }) addrNo: number;
  @ApiProperty({ required: false }) village: number;
  @ApiProperty({ required: false }) building: number;
  @ApiProperty({ required: false }) room: number;
  @ApiProperty({ required: false }) soi: number;
  @ApiProperty({ required: false }) road: number;
  @ApiProperty({ required: true }) subDistictId: number;
  @ApiProperty({ required: true }) districtId: number;
  @ApiProperty({ required: true }) provinceId: number;
  @ApiProperty({ required: true }) zipcode: number;
  @ApiProperty({ required: true }) countryId: number;
}

export class UserAddressRO {
  type: number;
  userId: UserRO;
  addrNo: number;
  village: number;
  building: number;
  room: number;
  soi: number;
  road: number;
  subDistictId: number;
  districtId: number;
  provinceId: number;
  zipcode: number;
  countryId: number;
}
