import { ApiProperty } from '@nestjs/swagger';
import { CountryRO } from './md-countries.dto';

export class GeographyDTO {
  @ApiProperty() nameTH: string;
  @ApiProperty({ required: true }) nameEN: string;
  @ApiProperty({ required: true }) nameCN: string;
  @ApiProperty({ required: true }) countryId: number;
}

// tslint:disable-next-line: max-classes-per-file
export class GeographyRO {
  nameTH: string;
  nameEN: string;
  nameCN: string;
  countryId: CountryRO;
}
