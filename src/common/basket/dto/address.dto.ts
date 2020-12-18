import { ApiProperty } from "@nestjs/swagger";

export class AddressDTO {
  @ApiProperty({ required: false }) type: number;
  @ApiProperty({ required: false }) addressTH: string;
  @ApiProperty({ required: false }) addressEN: string;
  @ApiProperty({ required: false }) addressCN: string;
  @ApiProperty({ required: false }) subDistictId: number;
  @ApiProperty({ required: false }) districtId: number;
  @ApiProperty({ required: false }) provinceId: number;
  @ApiProperty({ required: false }) zipcode: number;
  @ApiProperty({ required: false }) countryId: number;
  @ApiProperty({ required: false }) latitude: string;
  @ApiProperty({ required: false }) longitude: string;
}
