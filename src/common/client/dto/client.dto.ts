import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ClientDTO {
  clientId: string;
  @ApiProperty({ enum: ["WEBAPP", "UAT", "MOBILE", "OTHER"] }) type: string;
  @ApiProperty() name: string;
  @ApiProperty() host: string;
  @ApiProperty() email: string;
  @ApiProperty() password: string;
}

export class ClientAuthDTO {
  @IsString() @ApiProperty() clientId: string;
  @IsString() @ApiProperty() email: string;
  @IsString() @ApiProperty() password: string;
}

export class ClientRO {
  clientId: string;
  type: string;
  name: string;
  host: string;
  email: string;
  password: string;
  lastToken: string;
}
