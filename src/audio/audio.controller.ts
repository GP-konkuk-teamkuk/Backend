import * as path from 'path';
import {
  Controller,
  Get,
  Post,
  Body,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiOperation,
  ApiTags,
  ApiBody,
  ApiParam,
  ApiConsumes,
  ApiQuery,
  ApiOkResponse,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { AudioService } from './audio.service';
import { CreateAudioBookSentenceResponse } from './dto/create-audio-book-sentence.response';
import { CreateAudioBookResponse } from './dto/create-audio-book.response';
import { CreateAudioBookRequest } from './dto/create-audio.request';
import { UploadAudioRequest } from './dto/upload-audio.request';
import { UploadAudioResponse } from './dto/upload-audio.response';

@ApiTags('audio')
@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  // >> legacy
  @Post()
  @ApiOperation({ summary: 'Create audio book' })
  @ApiBody({ type: CreateAudioBookRequest })
  @ApiOkResponse({
    description: 'Get audio book by bookId and userId',
    type: [CreateAudioBookResponse],
  })
  create(@Body() createAudioDto: CreateAudioBookRequest): Promise<CreateAudioBookResponse> {
    return this.audioService.createAudioBook(createAudioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get audio book by bookId and userId, use in audiobook detail page' })
  @ApiQuery({ name: 'bookId', type: Number })
  @ApiQuery({ name: 'userId', type: Number })
  @ApiOkResponse({
    description: 'Get audio book by bookId and userId',
    type: [StreamableFile],
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
  @ApiBody({ type: CreateAudioBookRequest })
  @ApiOkResponse({
    description: 'Sucess to generate audio file',
    type: [CreateAudioBookSentenceResponse],
  })
  createSentence(@Body() createAudioDto: CreateAudioBookRequest) {
    return this.audioService.createAudioBookSentence(createAudioDto);
  }

  @Get('sentence')
  @ApiOperation({ summary: 'Get audio book by sentence, not used' })
  @ApiQuery({ name: 'bookId', type: Number })
  @ApiQuery({ name: 'userId', type: Number })
  @ApiOkResponse({
    description: 'Return audio generated file',
    type: [StreamableFile],
  })
  async findSentence(
    @Query('bookId') bookId: number,
    @Query('userId') userId: number,
    @Query('idx') idx: number,
  ) {
    //TODO : sentence generate
    return this.audioService.getAudioStreamFull(bookId, userId);
    //return this.audioService.getAudioStreamSentence(bookId, userId, idx);
  }

  @Post('upload')
  @ApiOperation({ summary: 'Upload audio file' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadAudioRequest })
  @ApiOkResponse({
    description: 'Get audio book by bookId and userId',
    type: [UploadAudioResponse],
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
  async uploadAudio(
    @UploadedFile() file: Express.Multer.File,
    @Body('userId') userId: number,
  ): Promise<UploadAudioResponse> {
    return this.audioService.uploadAudio(file, userId);
  }
}
