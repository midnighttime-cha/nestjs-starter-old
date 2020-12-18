import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class SettingDTO {
  @ApiProperty() @IsNumber() userId: number;
  @ApiProperty() @IsNumber() languageId: number;
  @ApiProperty({ required: false }) logo: string;
  @ApiProperty({ required: false }) iconHeader: string;
  @ApiProperty() @IsString() titleTH: string;
  @ApiProperty({ required: false }) titleEN: string;
  @ApiProperty({ required: false }) titleCN: string;
  @ApiProperty() @IsString() orgNameTH: string;
  @ApiProperty({ required: false }) orgNameEN: string;
  @ApiProperty({ required: false }) orgNameCN: string;
  @ApiProperty() @IsString() orgPrefixnameTH: string;
  @ApiProperty({ required: false }) orgPrefixnameEN: string;
  @ApiProperty({ required: false }) orgPrefixnameCN: string;
  @ApiProperty({ required: false }) emailContact: string;
  @ApiProperty({ required: false }) emailPassword: string;
}

export class SettingRO {
  id: number;
  userId: number;
  languageId: number;
  logo: string;
  iconHeader: string;
  titleTH: string;
  titleEN: string;
  titleCN: string;
  orgNameTH: string;
  orgNameEN: string;
  orgNameCN: string;
  orgPrefixnameTH: string;
  orgPrefixnameEN: string;
  orgPrefixnameCN: string;
  emailContact: string;
  emailPassword: string;
  users: object;
  languages: object;
}