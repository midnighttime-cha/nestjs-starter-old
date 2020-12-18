import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString, IsNumber } from "class-validator";

export class FileBasketDTO {
  @ApiProperty() @IsString() module: string;
  @ApiProperty() @IsNumber() moduleId: number;
  @ApiProperty() @IsString() type: string;
  @ApiProperty({ required: false }) typeDesc: string;
  @ApiProperty({ required: false }) orgname: string;
  @ApiProperty() @IsString() filename: string;
  @ApiProperty() @IsString() thumbName: string;
  @ApiProperty() @IsString() fileModule: string;
  @ApiProperty() @IsString() filePath: string;
  @ApiProperty() @IsString() thumbPath: string;
  @ApiProperty({ required: false }) fileType: string;
  @ApiProperty({ required: false }) width: number;
  @ApiProperty({ required: false }) height: number;
  @ApiProperty({ required: false }) playTime: string;
  @ApiProperty({ required: false }) captionTH: string;
  @ApiProperty({ required: false }) captionEN: string;
  @ApiProperty({ required: false }) captionCN: string;
  @ApiProperty({ required: false }) describeTH: string;
  @ApiProperty({ required: false }) describeEN: string;
  @ApiProperty({ required: false }) describeCN: string;
  @ApiProperty() @IsBoolean() isThumb: boolean;
}

export class FileBasketRO {
  id: number;
  module: string;
  moduleId: number;
  type: string;
  typeDesc: string;
  orgname: string;
  filename: string;
  thumbName: string;
  fileModule: string;
  filePath: string;
  thumbPath: string;
  fileType: string;
  width: number;
  height: number;
  captionTH: string;
  captionEN: string;
  captionCN: string;
  describeTH: string;
  describeEN: string;
  describeCN: string;
  isThumb: boolean;
}