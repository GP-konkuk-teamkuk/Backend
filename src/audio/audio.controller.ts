import { Controller, Get, Post, Body, Param, StreamableFile } from '@nestjs/common';
import { AudioService } from './audio.service';
import { CreateAudioDto } from './dto/create-audio.dto';
import { ApiOperation, ApiTags, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('audio')
@Controller('api/audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post()
  @ApiOperation({summary: 'Create User Audio'})
  @ApiBody({type: CreateAudioDto})
  create(@Body() createAudioDto: CreateAudioDto) {
    return this.audioService.create(createAudioDto);
  }

  @Get(':bookId/:userId')
  @ApiOperation({ summary: 'Get audio by bookId and userId' })
  @ApiParam({ name: 'bookId', type: Number })
  @ApiParam({ name: 'userId', type: Number })
  async findOne(@Param('bookId') bookId: number, @Param('userId') userId: number): Promise<StreamableFile> {
    return this.audioService.findOne(bookId, userId);
  }
}
