import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserAuthDTO {
  @ApiProperty() @IsNotEmpty() @IsString() username: string;
  @ApiProperty() @IsNotEmpty() @IsString() password: string;
}
