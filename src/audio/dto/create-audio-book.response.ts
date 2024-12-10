import { ApiProperty } from '@nestjs/swagger';

export class CreateAudioBookResponse {
  @ApiProperty({ description: 'Sucess message', type: 'string', example: 'Audiobook Created' })
  message: string;

  @ApiProperty({ description: 'ID of the audio', example: 1 })
  audioId: number;

  constructor(message: string, audioId: number) {
    this.message = message;
    this.audioId = audioId;
  }
}
