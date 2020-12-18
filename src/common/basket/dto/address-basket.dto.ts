import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddressBasketDTO {
  @ApiProperty() @IsNumber() type: number;
  @ApiProperty() @IsString() module: string;
  @ApiProperty() @IsNumber() moduleId: number;
  @ApiProperty({ required: false }) addressTH: string;
  @ApiProperty({ required: false }) addressEN: string;
  @ApiProperty({ required: false }) addressCN: string;
  @ApiProperty() @IsNumber() subDistictId: number;
  @ApiProperty() @IsNumber() districtId: number;
  @ApiProperty() @IsNumber() provinceId: number;
  @ApiProperty() @IsNumber() zipcode: number;
  countryId: number;
  @ApiProperty({ required: false }) latitude: string;
  @ApiProperty({ required: false }) longitude: string;
}

export class AddressBasketRO {
  id: number;
  type: number;
  moduleId: number;
  addressTH: string;
  addressEN: string;
  addressCN: string;
  subDistictId: number;
  districtId: number;
  provinceId: number;
  zipcode: number;
  countryId: number;
  latitude: string;
  longitude: string;
}
