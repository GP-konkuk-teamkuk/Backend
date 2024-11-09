import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ description: 'The email of the user' })
  id: string;

  @ApiProperty({ description: 'The password of the user' })
  pw: string;
}
