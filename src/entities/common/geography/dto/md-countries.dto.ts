import { ApiProperty } from '@nestjs/swagger';

export class CountryDTO {
  @ApiProperty() nameTH: string;
  @ApiProperty({ required: false }) nameEN: string;
  @ApiProperty({ required: false }) nameCN: string;
  @ApiProperty({ required: false }) prefix2: string;
  @ApiProperty({ required: false }) prefix3: string;
}

// tslint:disable-next-line: max-classes-per-file
export class CountryRO {
  nameTH: string;
  nameEN: string;
  nameCN: string;
  prefix2: string;
  prefix3: string;
}
