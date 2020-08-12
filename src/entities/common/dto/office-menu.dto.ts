import { ApiProperty } from "@nestjs/swagger";

export class OfficeMenusDTO {
  @ApiProperty({ required: false }) code: string;
  @ApiProperty({ required: false }) titleTH: string;
  @ApiProperty({ required: false }) titleEN: string;
  @ApiProperty({ required: false }) titleCN: string;
  @ApiProperty({ required: false }) icon: string;
  @ApiProperty({ required: false }) type: number;
  @ApiProperty({ required: false }) url: string;
  @ApiProperty({ required: false }) sort: number;
  @ApiProperty({ required: false }) mode: string;
  @ApiProperty({ required: false }) route: number;
}
