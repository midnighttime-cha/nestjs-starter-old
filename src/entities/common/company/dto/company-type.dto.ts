import { ApiProperty } from '@nestjs/swagger';

export class CompanyTypeDTO {
  @ApiProperty() code: string;
  @ApiProperty() titleNameTH: string;
  @ApiProperty({ required: false }) titleNameEN: string;
  @ApiProperty({ required: false }) titleNameCN: string;
  @ApiProperty({ required: false }) nameTH: string;
  @ApiProperty({ required: false }) nameEN: string;
  @ApiProperty({ required: false }) nameCN: string;
}

// tslint:disable-next-line: max-classes-per-file
export class CompanyTypeRO {
  code: string;
  titleNameTH: number;
  titleNameEN: string;
  titleNameCN: string;
  nameTH: string;
  nameEN: string;
  nameCN: string;
}
