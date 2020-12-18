import { ApiProperty } from "@nestjs/swagger";

export class RegisterDTO {
  @ApiProperty() refNo: string;
  @ApiProperty({ default: "ChineseInbound_EMT" }) profile: string;
  @ApiProperty({ default: "Eng" }) memberPeferredLanguage: string;
  @ApiProperty() staffIdNo: string;
  @ApiProperty({ enum: ["Miss", "Master", "Mrs.", "Mr.", "Doctor (Dr.)", "Professor", "Assistant Professor", "Associate Professor"] }) title: string;
  @ApiProperty() firstName: string;
  @ApiProperty() lastName: string;
  @ApiProperty() gender: string;
  @ApiProperty() dob: string;
  @ApiProperty() ssn: string;
  @ApiProperty() nationality: string;
  @ApiProperty({ default: "Main Insured/Employee" }) memberType: string;
  @ApiProperty() plan: string;
  @ApiProperty() memberEffectiveDate: string;
  @ApiProperty() memberDeletionDate: string;
  @ApiProperty({ default: "9999999999" }) tel: string;
  @ApiProperty() email: string;
  @ApiProperty({ required: false }) companyBranchName: string;
  @ApiProperty({ required: false }) branchEffective: string;
  @ApiProperty({ required: false }) departmentCode: string;
  @ApiProperty({ required: false }) departmentName: string;
  @ApiProperty({ required: false }) position: string;
  @ApiProperty({ required: false }) locationArea: string;
  @ApiProperty({ required: false }) telephoneHome: string;
  @ApiProperty({ required: false }) lineId: string;
  @ApiProperty({ required: false }) facebookId: string;
  @ApiProperty({ required: false }) wechatId: string;
  @ApiProperty({ required: false }) remark: string;
}