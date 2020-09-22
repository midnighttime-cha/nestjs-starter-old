import { ApiProperty } from '@nestjs/swagger';

export class UserTypeDTO {
  @ApiProperty() code: string;
  @ApiProperty() level: number;
  @ApiProperty() titleTH: string;
  @ApiProperty({ required: false }) titleEN: string;
  @ApiProperty({ required: false }) titleCN: string;
}

export class UserTypeRO {
  code: string;
  level: number;
  titleTH: string;
  titleEN: string;
  titleCN: string;
}
