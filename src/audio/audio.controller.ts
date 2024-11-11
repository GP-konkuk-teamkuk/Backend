import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { AudioService } from './audio.service';
import { CreateAudioBookDto } from './dto/create-audio.dto';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiConsumes,
  ApiQuery,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { UploadAudioDto } from './dto/upload-audio.dto';
import { Stream } from 'stream';

@ApiTags('audio')
@Controller('/api/audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  // >> legacy
  @Post()
  @ApiOperation({ summary: 'Create audio book' })
  @ApiBody({ type: CreateAudioBookDto })
  @ApiResponse({
    status: 200,
    description: 'Get audio book by bookId and userId',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'message', example: 'Audiobook Created' },
        audioId: { type: 'number', example: 1 },
      },
    },
  })
  create(@Body() createAudioDto: CreateAudioBookDto) {
    console.log(createAudioDto);
    return this.audioService.createAudioBook(createAudioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get audio book by bookId and userId, use in audiobook detail page' })
  @ApiQuery({ name: 'bookId', type: Number })
  @ApiQuery({ name: 'userId', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Get audio book by bookId and userId',
    schema: {
      type: 'object',
      properties: {
        file: { type: 'Promise<StreambleFile>', example: 'Promise<StreamableFile>' },
      },
    },
  })
  async findOne(
    @Query('bookId') bookId: number,
    @Query('userId') userId: number,
  ): Promise<StreamableFile> {
    return this.audioService.getAudioStreamFull(bookId, userId);
  }

  // << legacy end

  @Post('sentence')
  @ApiOperation({ summary: 'Create audio book, not used' })
  @ApiBody({ type: CreateAudioBookDto })
  createSentence(@Body() createAudioDto: CreateAudioBookDto) {
    return this.audioService.createAudioBookSentence(createAudioDto);
  }

  @Get('sentence')
  @ApiOperation({ summary: 'Get audio book by sentence, not used' })
  @ApiQuery({ name: 'bookId', type: Number })
  @ApiQuery({ name: 'userId', type: Number })
  async findSentence(
    @Query('bookId') bookId: number,
    @Query('userId') userId: number,
    @Query('idx') idx: number,
  ) {
    //TODO : sentence generate
    return this.audioService.getAudioStreamSentence(bookId, userId, idx);
  }

  @Post('upload')
  @ApiOperation({ summary: 'Upload audio file' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadAudioDto })
  @ApiResponse({
    status: 200,
    description: 'Get audio book by bookId and userId',
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'number', example: 1 },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          const filename = `${Date.now()}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadAudio(@UploadedFile() file: Express.Multer.File, @Body('userId') userId: number) {
    console.log(userId);
    return this.audioService.uploadAudio(file, userId);
  }
}
