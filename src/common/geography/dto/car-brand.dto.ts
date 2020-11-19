import { ApiProperty } from '@nestjs/swagger';

export class CarBrandDTO {
  @ApiProperty() nameTH: string;
  @ApiProperty({ required: false }) nameEN: string;
  @ApiProperty({ required: false }) nameCN: string;
}

// tslint:disable-next-line: max-classes-per-file
export class CarBrandRO {
  id: number;
  code: string;
  nameTH: string;
  nameEN: string;
  nameCN: string;
}