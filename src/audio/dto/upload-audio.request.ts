import { ApiProperty } from '@nestjs/swagger';

export class UploadAudioRequest {
  @ApiProperty({ type: 'string', format: 'binary' })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file: any;

  @ApiProperty({ description: 'ID of the user', example: 1 })
  userId: number;
}
