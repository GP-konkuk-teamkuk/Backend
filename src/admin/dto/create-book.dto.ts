import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ type: 'string', format: 'binary', description: 'Image file (jpg)' })
  image: any;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Text file (txt)' })
  text: any;

  @ApiProperty()
  title: string;
}
