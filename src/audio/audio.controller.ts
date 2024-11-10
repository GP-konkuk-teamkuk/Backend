import { Controller, Get, Post, Body, Param, StreamableFile, UploadedFile, UseInterceptors, Query } from '@nestjs/common';
import { AudioService } from './audio.service';
import { CreateAudioBookDto } from './dto/create-audio.dto';
import { ApiOperation, ApiTags, ApiBody, ApiParam, ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { UploadAudioDto } from './dto/upload-audio.dto';

@ApiTags('audio')
@Controller('/api/audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post()
  @ApiOperation({ summary: 'Create audio book' })
  @ApiBody({ type: CreateAudioBookDto })
  create(@Body() createAudioDto: CreateAudioBookDto) {
    return this.audioService.createAudioBook(createAudioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get audio book by bookId and userId' })
  @ApiQuery({ name: 'bookId', type: Number })
  @ApiQuery({ name: 'userId', type: Number })
  async findOne(@Query('bookId') bookId: number, @Query('userId') userId: number): Promise<StreamableFile> {
    return this.audioService.findOne(bookId, userId);
  }

  @Post('upload')
  @ApiOperation({ summary: 'Upload audio file' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadAudioDto })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}${ext}`;
        cb(null, filename);
      },
    }),
  }))
  async uploadAudio(@UploadedFile() file: Express.Multer.File, @Param('userId') userId: number) {
    return this.audioService.uploadAudio(file,  userId);
  }
}
