import { ApiProperty } from "@nestjs/swagger";

export class DevClientDTO {
  clientId: string;
  @ApiProperty({ required: true }) type: string;
  @ApiProperty({ required: true }) name: string;
  @ApiProperty({ required: true }) host: string;
  @ApiProperty({ required: true }) email: string;
  secret: string;
  lastToken: string;
}

export class DevClientRO {
  clientId: string;
  type: string;
  name: string;
  host: string;
  email: string;
  secret: string;
  lastToken: string;
  modifyAt: Date;
}