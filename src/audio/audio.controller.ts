import { Controller, Get, Post, Body, Param, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AudioService } from './audio.service';
import { CreateAudioBookDto } from './dto/create-audio.dto';
import { ApiOperation, ApiTags, ApiBody, ApiParam, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { UploadAudioDto } from './dto/upload-audio.dto';

@ApiTags('audio')
@Controller('api/audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Post()
  @ApiOperation({ summary: 'Create User Audio' })
  @ApiBody({ type: CreateAudioBookDto })
  create(@Body() createAudioDto: CreateAudioBookDto) {
    return this.audioService.createAudioBook(createAudioDto);
  }

  @Get(':bookId/:userId')
  @ApiOperation({ summary: 'Get audio by bookId and userId' })
  @ApiParam({ name: 'bookId', type: Number })
  @ApiParam({ name: 'userId', type: Number })
  async findOne(@Param('bookId') bookId: number, @Param('userId') userId: number): Promise<StreamableFile> {
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
