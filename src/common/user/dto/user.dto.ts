import { ApiProperty } from "@nestjs/swagger";
import { AddressBasketDTO } from "src/common/basket/dto/address-basket.dto";
import { UserAuthDTO } from "./user-auth.dto";

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
  @ApiProperty({ required: false }) address: AddressBasketDTO;
  @ApiProperty({ required: false }) userAuthens: UserAuthDTO[];
}

export class UserRegisterDTO {
  @ApiProperty({ required: true }) type: string;
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
  password: string;
  titlenameId: number;
  firstnameTH: string;
  firstnameEN: string;
  firstnameCN: string;
  lastnameTH: string;
  lastnameEN: string;
  lastnameCN: string;
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
  email: string;
  googleId: string;
  wechatId: string;
  lineid: string;
  website: string;
  gender: string;
  image: string;
  imageThumb: string;
  imagePath: string;
  secret: string;
  isActive: boolean;
  isDelete: boolean;
  createBy: number;
  modifyBy: number;
  createAt: Date;
  modifyAt: Date;
}