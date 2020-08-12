import { ApiProperty } from "@nestjs/swagger";

export class ProvincesDTO {
  @ApiProperty({ required: false }) nameTH: string;
  @ApiProperty({ required: false }) nameEN: string;
  @ApiProperty({ required: false }) nameCN: string;
  @ApiProperty({ required: false }) sizeArea: number;
  @ApiProperty({ required: false }) countryId: number;
  @ApiProperty({ required: false }) geographyId: number;
}