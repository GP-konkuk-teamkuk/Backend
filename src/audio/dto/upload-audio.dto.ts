import { ApiProperty } from '@nestjs/swagger';

export class UploadAudioDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

  @ApiProperty({ description: 'ID of the user', example: 1 })
  userId: number;
}
