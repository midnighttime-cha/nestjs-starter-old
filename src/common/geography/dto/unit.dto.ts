import { ApiProperty } from '@nestjs/swagger';

export class UnitDTO {
  @ApiProperty() nameTH: string;
  @ApiProperty({ required: false }) nameEN: string;
  @ApiProperty({ required: false }) nameCN: string;
}

// tslint:disable-next-line: max-classes-per-file
export class UnitRO {
  id: number;
  nameTH: string;
  nameEN: string;
  nameCN: string;
}
