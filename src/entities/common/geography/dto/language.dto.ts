import { ApiProperty } from "@nestjs/swagger";

export class LanguageDTO {
  id: number;
  @ApiProperty() titleTH: string;
  @ApiProperty({ required: false }) titleEN: string;
  @ApiProperty({ required: false }) titleCN: string;
  @ApiProperty({ required: false }) prefixTh: string;
  @ApiProperty({ required: false }) prefixEn: string;
  @ApiProperty({ required: false }) prefixCn: string;
}

export class LanguageRO {
  id: number;
  titleTH: string;
  titleEN: string;
  titleCN: string;
  prefixTh: string;
  prefixEn: string;
  prefixCn: string;
}