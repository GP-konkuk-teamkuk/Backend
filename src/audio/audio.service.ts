import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ffmpeg from 'fluent-ffmpeg';
import { Repository } from 'typeorm';
import { Book } from '../book/entities/book.entity';
import { User } from '../user/entities/user.entity';
import { CreateAudioBookSentenceResponse } from './dto/create-audio-book-sentence.response';
import { CreateAudioBookResponse } from './dto/create-audio-book.response';
import { CreateAudioBookRequest } from './dto/create-audio.request';
import { UploadAudioResponse } from './dto/upload-audio.response';
import { Audio } from './entities/audio.entity';

@Injectable()
export class AudioService {
  private readonly AUDIO_FILE_MIN_DURATION = 5000;
  private readonly AUDIO_FILE_MAX_DURATION = 20000;
  private readonly AUDIO_FILE_DURATION_TO_MS = 1000;

  constructor(
    @InjectRepository(Audio)
    private audioRepository: Repository<Audio>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async createAudioBook(createAudioDto: CreateAudioBookRequest) {
    const { bookId, userId } = createAudioDto;

    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    const textFilePath = path.join(`${book.detail}`);
    if (!fs.existsSync(textFilePath)) {
      throw new NotFoundException('Text file not found');
    }

    const textContent = fs.readFileSync(textFilePath, 'utf8');
    const currentDir = __dirname;
    const hashAndTime = `${userId}_${bookId}`;
    const outputFileName = `${hashAndTime}.wav`;
    const outputFilePath = path.join(
      currentDir,
      '..',
      '..',
      'sv2tts_korean',
      'synthesized_samples',
      outputFileName,
    );

    const sentence = textContent.split('.')[0];

    const command = `conda run -n myenv python ${path.join(currentDir, '..', '..', 'sv2tts_korean', 'synthesize_voice.py')} --text "${sentence}" --hash_and_time ${hashAndTime}`;
    execSync(command);

    const audio = new Audio();
    audio.book = book;
    audio.user = await this.userRepository.findOne({ where: { id: userId } });
    audio.audio = outputFilePath;
    //TODO : literal
    audio.length = 100;
    await this.audioRepository.save(audio);

    const result = new CreateAudioBookResponse('Audiobook Created', audio.id);

    return result;
  }

  async createAudioBookSentence(createAudioDto: CreateAudioBookRequest) {
    const { bookId, userId } = createAudioDto;

    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    const textFilePath = path.join(`${book.detail}`);
    if (!fs.existsSync(textFilePath)) {
      throw new NotFoundException('Text file not found');
    }

    const textContent = fs.readFileSync(textFilePath, 'utf8');
    const seperateTextContent = textContent.split('.');

    const currentDir = __dirname;
    const hashAndTime = `${bookId}_${userId}`;
    const outputFileName = `${hashAndTime}.wav`;
    const outputFilePath = path.join(
      currentDir,
      '..',
      '..',
      'sv2tts_korean',
      'synthesized_samples',
      outputFileName,
    );
    seperateTextContent.forEach(async (val, idx) => {
      const command = `conda run -n myenv python ${path.join(currentDir, '..', '..', 'sv2tts_korean', 'synthesize_voice.py')} --text "${val}" --hash_and_time ${hashAndTime}-${idx}`;
      execSync(command);
    });

    const audio = new Audio();
    audio.book = book;
    audio.user = await this.userRepository.findOne({ where: { id: userId } });
    audio.audio = outputFilePath;
    audio.length = seperateTextContent.length;

    await this.audioRepository.save(audio);

    const result = new CreateAudioBookSentenceResponse('Audiobook Created', audio.id, audio.length);
    return result;
  }

  async getAudioStreamFull(bookId: number, userId: number): Promise<StreamableFile> {
    const audio = await this.audioRepository.findOne({
      where: {
        book: { id: bookId },
        user: { id: userId },
      },
    });
    if (!audio) {
      throw new NotFoundException('AudioBook not found');
    }

    const filePath = audio.audio;
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Audio file not found');
    }

    const file = fs.createReadStream(filePath);
    return new StreamableFile(file);
  }

  // 오디오 - /api/audio/sentence - bookId, userId, idx querystring, get

  // sentence 강조 -> audio 가 끝날때마다 fe 각 문장을 bold 처리 해주면 됨.
  //
  // sentence -> text 전체를 보내줌. get /api/book/detail <- 여기서 가져오면 됨.

  async getAudioStreamSentence(
    bookId: number,
    userId: number,
    idx: number,
  ): Promise<StreamableFile> {
    const audio = await this.audioRepository.findOne({
      where: {
        book: { id: bookId },
        user: { id: userId },
      },
    });
    if (!audio) {
      throw new NotFoundException('AudioBook not found');
    }

    const filePath = audio.audio;
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Audio file not found');
    }

    const file = fs.createReadStream(filePath);
    return new StreamableFile(file);
  }

  private async checkAudioFileLength(filePath: string) {
    const result: ffmpeg.FfprobeData = await new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, data: ffmpeg.FfprobeData) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
    // TODO : 테스트 명세서에 따라 변경 필요
    if (!result.format.format_name.match('wav')) throw new BadRequestException('Wrong Audio File');
    if (!result.format.duration) throw new BadRequestException('Wrong Audio File');
    if (result.format.duration * this.AUDIO_FILE_DURATION_TO_MS < this.AUDIO_FILE_MIN_DURATION) {
      throw new BadRequestException('Audio File is too short');
    } else if (
      result.format.duration * this.AUDIO_FILE_DURATION_TO_MS >
      this.AUDIO_FILE_MAX_DURATION
    ) {
      throw new BadRequestException('Audio File is too long');
    }
  }

  async uploadAudio(file: Express.Multer.File, userId: number) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    await this.checkAudioFileLength(file.path);

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const currentDir = __dirname;
    const command = `conda run -n myenv python ${path.join(currentDir, '..', '..', 'sv2tts_korean', 'embedding_extraction.py')} --ref_voice_path "${file.path}" --hash ${userId}`;
    execSync(command);

    user.embedding = path.join(
      currentDir,
      '..',
      '..',
      'sv2tts_korean',
      'embeddings',
      `${userId}.pkl`,
    );
    this.userRepository.save(user);
    return new UploadAudioResponse(user.id);
  }
}
