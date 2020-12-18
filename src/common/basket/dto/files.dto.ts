import { ApiProperty } from "@nestjs/swagger";

export class FilesDTO {
  @ApiProperty({ required: false }) type: string;
  @ApiProperty({ required: false }) orgname: string;
  @ApiProperty({ required: false }) filename: string;
  @ApiProperty({ required: false }) filepath: string;
  @ApiProperty({ required: false }) thumbFilename: string;
  @ApiProperty({ required: false }) thumbpath: string;
  @ApiProperty({ required: false }) filetype: string;
  @ApiProperty({ required: false }) width: number;
  @ApiProperty({ required: false }) height: number;
  @ApiProperty({ required: false }) size: number;
  @ApiProperty({ required: false }) captionTH: string;
  @ApiProperty({ required: false }) captionEN: string;
  @ApiProperty({ required: false }) captionCN: string;
  @ApiProperty({ required: false }) describeTH: string;
  @ApiProperty({ required: false }) describeEN: string;
  @ApiProperty({ required: false }) describeCN: string;
  @ApiProperty({ required: false }) isThumb: boolean;
}