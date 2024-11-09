import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The username of the user' })
  nickname: string;

  @ApiProperty({ description: 'The password of the user' })
  pw: string;

  @ApiProperty({ description: 'The email of the user' })
  id: string;
}
