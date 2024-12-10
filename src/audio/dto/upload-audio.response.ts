import { ApiProperty } from '@nestjs/swagger';

export class UploadAudioResponse {
  @ApiProperty({ description: 'user id', type: 'number', example: 1 })
  userId: number;

  constructor(userId: number) {
    this.userId = userId;
  }
}
