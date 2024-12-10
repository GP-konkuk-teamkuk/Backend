import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, MinLength } from 'class-validator';

export class CreateUserRequest {
  @ApiProperty({ description: 'The username of the user' })
  @IsString()
  @Length(2, 15)
  nickname: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsString()
  @MinLength(8)
  pw: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  id: string;
}
