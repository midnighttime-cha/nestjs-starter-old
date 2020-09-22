import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UserDTO {
  @IsString() @ApiProperty({ required: true, default: 'US' }) type: string;
  groupId: number;
  companyId: number;
  @IsNotEmpty() @ApiProperty({ required: true }) username: string;
  @IsString() @ApiProperty({ required: true }) password: string;
  @IsNumber() @ApiProperty({ required: true }) titlenameId: number;
  @ApiProperty({ required: true }) firstnameTH: string;
  @ApiProperty({ required: true }) firstnameEN: string;
  @ApiProperty({ required: false }) firstnameCN: string;
  @ApiProperty({ required: true }) email: string;
  @ApiProperty({ required: false }) lastnameTH: string;
  @ApiProperty({ required: false }) lastnameEN: string;
  @ApiProperty({ required: false }) lastnameCN: string;
  idCard: string;
  religion: string;
  nationality: string;
  race: string;
  occupation: string;
  birthDay: Date;
  phoneNo: string;
  phoneExt: string;
  faxNo: string;
  faxExt: string;
  mobileNo: string;
  googleId: string;
  @ApiProperty({ required: false }) wechatId: string;
  @ApiProperty({ required: false }) wxid: string;
  @ApiProperty({ required: false }) agencyCode: string;
  lineid: string;
  website: string;
  gender: string;
  image: string;
  imageThumb: string;
  imagePath: string;
}

export class UserRO {
  id: number;
  code: string;
  groupId: number;
  companyId: number;
  username: string;
  email: string;
  firstnameTH: string;
  firstnameEN: string;
  firstnameCN: string;
  lastnameTH: string;
  lastnameEN: string;
  lastnameCN: string;
  token: string;
  agencyCode: string;
}
