import { ApiProperty } from '@nestjs/swagger';

export class LoginUserRequest {
  @ApiProperty({ description: 'The email of the user', example: 'test@nav.com' })
  id: string;

  @ApiProperty({ description: 'The password of the user', example: 'k1313!13K' })
  pw: string;
}
