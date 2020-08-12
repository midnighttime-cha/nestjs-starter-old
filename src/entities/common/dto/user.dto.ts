import { ApiProperty } from "@nestjs/swagger";

export class UserDTO {
  @ApiProperty({ required: true }) type: string;
  @ApiProperty({ required: false }) level: number;
  @ApiProperty({ required: false }) groupId: number;
  @ApiProperty({ required: false }) companyId: number;
  @ApiProperty({ required: true }) username: string;
  @ApiProperty({ required: false }) password: string;
  @ApiProperty({ required: false }) titlenameId: number;
  @ApiProperty({ required: true }) firstnameTH: string;
  @ApiProperty({ required: true }) firstnameEN: string;
  @ApiProperty({ required: false }) firstnameCN: string;
  @ApiProperty({ required: false }) lastnameTH: string;
  @ApiProperty({ required: false }) lastnameEN: string;
  @ApiProperty({ required: false }) lastnameCN: string;
  @ApiProperty({ required: false }) idCard: string;
  @ApiProperty({ required: false }) birthDay: Date;
  @ApiProperty({ required: false }) mobileNo: string;
  @ApiProperty({ required: true }) email: string;
  @ApiProperty({ required: false }) gender: string;
}

export class UserRO {
  id: number;
  code: string;
  type: string;
  level: number;
  groupId: number;
  companyId: number;
  username: string;
  password: string;
  titlenameId: number;
  firstnameTH: string;
  firstnameEN: string;
  firstnameCN: string;
  lastnameTH: string;
  lastnameEN: string;
  lastnameCN: string;
  idCard: string;
  birthDay: Date;
  mobileNo: string;
  email: string;
  gender: string;
}