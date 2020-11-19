import { ApiProperty } from '@nestjs/swagger';

export class UserGroupDTO {
  @ApiProperty() titleTH: string;
  @ApiProperty({ required: false }) titleEN: string;
  @ApiProperty({ required: false }) titleCN: string;
}