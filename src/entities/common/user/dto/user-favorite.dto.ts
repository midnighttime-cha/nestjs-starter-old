import { ApiProperty } from "@nestjs/swagger";

export class UserFavoriteDTO {
  @ApiProperty() userId: number;
  @ApiProperty() type: string;
  @ApiProperty() favoriteId: number;
}

export class UserFavoriteRO {
  userId: number;
  type: string;
  favoriteId: number;
}