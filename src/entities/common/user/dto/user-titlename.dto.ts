import { ApiProperty } from '@nestjs/swagger';

export class UserTitlenameDTO {
  @ApiProperty() titleTH: string;
  @ApiProperty({ required: false }) titleEN: string;
  @ApiProperty({ required: false }) titleCN: string;
}

// tslint:disable-next-line: max-classes-per-file
export class UserTitlenameRO {
  titleTH: string;
  titleEN: string;
  titleCN: string;
}
