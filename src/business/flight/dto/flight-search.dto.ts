import { ApiProperty } from "@nestjs/swagger";

export class FlightSearchDTO {
  @ApiProperty() triptype: string;
  @ApiProperty() originCode: string;
  @ApiProperty() destinationCode: string;
  @ApiProperty() airline: string;
  @ApiProperty() svc_class: string;
  @ApiProperty() directflight: boolean;
  @ApiProperty() departdate: Date;
  @ApiProperty() returndate: Date;
  @ApiProperty() adult: number;
  @ApiProperty() child: number;
  @ApiProperty() infant: number;
  @ApiProperty() languageCode: string;
}