import { ApiProperty } from "@nestjs/swagger";

export class ThirstPartyDTO {
  @ApiProperty() type: string;
  @ApiProperty() name: string;
  @ApiProperty() url: string;
  @ApiProperty() username: string;
  @ApiProperty() password: string;
  @ApiProperty() lastToken: string;
  @ApiProperty() tokenType: string;
  @ApiProperty() expires: Date;
  @ApiProperty() isProduction: boolean;
}

export class ThirstPartyRO {
  type: string;
  name: string;
  url: string;
  username: string;
  password: string;
  lastToken: string;
  tokenType: string;
  expires: Date
  isProduction: boolean;
}