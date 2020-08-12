import { ApiProperty } from "@nestjs/swagger";

export class GeographiesDTO {
  @ApiProperty({ required: false }) nameTH: string;
  @ApiProperty({ required: false }) nameEN: string;
  @ApiProperty({ required: false }) nameCN: string;
  @ApiProperty({ required: false }) countryId: number;
}