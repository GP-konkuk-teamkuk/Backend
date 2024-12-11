import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ type: 'string', format: 'binary', description: 'Image file (jpg)' })
  image?: any;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Text file (txt)' })
  content?: any;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Text file (txt)' })
  intro?: any;

  @ApiProperty({ type: 'string', description: 'title' })
  title: string;

  @ApiProperty({ type: 'string', description: 'author' })
  author: string;

  @ApiProperty({
    type: 'number',
    description: 'running time (estimate)',
  })
  runningTime: number;

  @ApiProperty({ type: 'string', description: 'press' })
  press: string;
}
