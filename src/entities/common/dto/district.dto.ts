import { ApiProperty } from "@nestjs/swagger";

export class DistrictsDTO {
  @ApiProperty({ required: false }) nameTH: string;
  @ApiProperty({ required: false }) nameEN: string;
  @ApiProperty({ required: false }) nameCN: string;
  @ApiProperty({ required: false }) sizeArea: number;
  @ApiProperty({ required: false }) provinceId: number;
  @ApiProperty({ required: false }) geographyId: number;
  @ApiProperty({ required: false }) countryId: number;
}
