import { ApiProperty } from '@nestjs/swagger';
import { SubDistrictRO } from './md-sub-district.dto';

export class ZipcodeDTO {
  @ApiProperty() sdId: number;
  @ApiProperty() zipcode: string;
}

// tslint:disable-next-line: max-classes-per-file
export class ZipcodeRO {
  sdId: number;
  zipcode: string;
  zipSubDistrict: SubDistrictRO;
}
