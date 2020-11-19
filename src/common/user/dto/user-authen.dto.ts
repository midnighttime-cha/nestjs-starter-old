import { ApiProperty } from "@nestjs/swagger";

export class UserAuthenDTO {
  @ApiProperty() userId: number;
  @ApiProperty() menuId: number;
  @ApiProperty() access: boolean;
  @ApiProperty() view: boolean;
  @ApiProperty() create: boolean;
  @ApiProperty() modify: boolean;
  @ApiProperty() delete: boolean;
  @ApiProperty() approve: boolean;
}

export class UserAuthenRO {
  @ApiProperty() userId: number;
  @ApiProperty() menuId: number;
  @ApiProperty() access: boolean;
  @ApiProperty() view: boolean;
  @ApiProperty() create: boolean;
  @ApiProperty() modify: boolean;
  @ApiProperty() delete: boolean;
  @ApiProperty() approve: boolean;
}