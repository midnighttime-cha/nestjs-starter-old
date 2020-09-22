import { CompanyTypeRO } from './company-type.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CompanyDTO {
  @ApiProperty() typeId: number;
  @ApiProperty() branchType: string;
  @ApiProperty() nameTH: string;
  @ApiProperty({ required: false }) nameEN: string;
  @ApiProperty({ required: false }) nameCN: string;
  @ApiProperty({ required: false }) contactPhone1: string;
  @ApiProperty({ required: false }) contactPhone1Ext: string;
  @ApiProperty({ required: false }) contactPhone2: string;
  @ApiProperty({ required: false }) contactPhone2Ext: string;
  @ApiProperty({ required: false }) contactMobile1: string;
  @ApiProperty({ required: false }) contactMobile2: string;
  @ApiProperty({ required: false }) contactFax1: string;
  @ApiProperty({ required: false }) contactFax1Ext: string;
  @ApiProperty({ required: false }) contactFax2: string;
  @ApiProperty({ required: false }) contactFax2Ext: string;
  @ApiProperty({ required: false }) website: string;
  @ApiProperty({ required: false }) email1: string;
  @ApiProperty({ required: false }) email2: string;
  @ApiProperty({ required: false }) lineid: string;
  @ApiProperty({ required: false }) registeredCapital: number;
  @ApiProperty({ required: false }) shareholdersDomestic: number;
  @ApiProperty({ required: false }) shareholdersForeign: number;
  @ApiProperty({ required: false }) totalEmployee: number;
  @ApiProperty({ required: false }) yearEstablished: number;
  @ApiProperty({ required: false }) industrygroupId: number;
  @ApiProperty({ required: false }) businesstypeId: number;
  @ApiProperty({ required: false }) products: string;
  @ApiProperty({ required: false }) userContact: string;
  @ApiProperty({ required: false }) logoFilename: string;
  @ApiProperty({ required: false }) logoThumbName: string;
  @ApiProperty({ required: false }) logoFileModule: string;
  @ApiProperty({ required: false }) certified: string;
  @ApiProperty({ required: false, default: false }) systemOwner: boolean;
}

// tslint:disable-next-line: max-classes-per-file
export class CompanyRO {
  code: string;
  typeId: CompanyTypeRO;
  branchType: string;
  nameTH: string;
  nameEN: string;
  nameCN: string;
  contactPhone1: string;
  contactPhone1Ext: string;
  contactPhone2: string;
  contactPhone2Ext: string;
  contactMobile1: string;
  contactMobile2: string;
  contactFax1: string;
  contactFax1Ext: string;
  contactFax2: string;
  contactFax2Ext: string;
  website: string;
  email1: string;
  email2: string;
  lineid: string;
  registeredCapital: number;
  shareholdersDomestic: number;
  shareholdersForeign: number;
  totalEmployee: number;
  yearEstablished: number;
  industrygroupId: number;
  businesstypeId: number;
  products: string;
  userContact: string;
  logoFilename: string;
  logoThumbName: string;
  logoFileModule: string;
  certified: string;
  systemOwner: number;
}
