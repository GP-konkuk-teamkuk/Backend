import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAudioBookDto } from './dto/create-audio.dto';
import { Audio } from './entities/audio.entity';
import * as fs from 'fs';
import * as path from 'path';
import { StreamableFile } from '@nestjs/common';
import { execSync } from 'child_process';
import { User } from '../user/entities/user.entity';
import { Book } from '../book/entities/book.entity';

@Injectable()
export class AudioService {
  constructor(
    @InjectRepository(Audio)
    private audioRepository: Repository<Audio>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async createAudioBook(createAudioDto: CreateAudioBookDto) {
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
    const command = `conda run -n myenv python ${path.join(currentDir, '..', '..', 'sv2tts_korean', 'synthesize_voice.py')} --text "${textContent}" --hash_and_time ${hashAndTime}`;
    execSync(command);

    const audio = new Audio();
    audio.book = book;
    audio.user = await this.userRepository.findOne({ where: { id: userId } });
    audio.audio = outputFilePath;
    await this.audioRepository.save(audio);

    return { message: 'Audiobook Created', audioId: audio.id };
  }

  async findOne(bookId: number, userId: number): Promise<StreamableFile> {
    console.error(bookId, userId);
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

  async uploadAudio(file: Express.Multer.File, userId: number) {
    console.error(userId);
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

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
    return user;
  }
}
