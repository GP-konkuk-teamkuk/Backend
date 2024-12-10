import { ApiProperty } from '@nestjs/swagger';
import { CreateAudioBookResponse } from './create-audio-book.response';

export class CreateAudioBookSentenceResponse extends CreateAudioBookResponse {
  @ApiProperty({ description: 'Audio length', type: 'number', example: 10 })
  length: number;

  constructor(message: string, audioId: number, length: number) {
    super(message, audioId);
    this.length = length;
  }
}
