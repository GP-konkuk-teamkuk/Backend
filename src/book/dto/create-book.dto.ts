import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ type: 'string', format: 'binary', description: 'Image file (jpg)' })
  image: any;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Text file (txt)' })
  text: any;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Text file title (txt)' })
  title: string;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Text file author (txt)' })
  author: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Text file running time (estimate)',
  })
  runningTime: number;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Text file press (txt)' })
  press: string;
}
