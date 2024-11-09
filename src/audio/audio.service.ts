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
import { Multer } from 'multer';

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
    console.error(book);

    const textFilePath = path.join(__dirname, "..", "..", `${book.detail}`);
    console.error(textFilePath);
    if (!fs.existsSync(textFilePath)) {
      throw new NotFoundException('Text file not found');
    }

    const textContent = fs.readFileSync(textFilePath, 'utf8');

    const currentDir = __dirname;
    const command = `conda run -n myenv python ${path.join(currentDir, '..', '..', 'sv2tts_korean', 'synthesize_voice.py')} --text "${textContent}" --hash_and_time ${1}_${1}`;
    execSync(command);

    return 'Audiobook Created';
  }

  async findOne(bookId: number, userId: number): Promise<StreamableFile> {
    const audio = await this.audioRepository.findOne({
      where: {
        book: { id: bookId },
        user: { id: userId },
      },
      select: ['audio'],
    });
    if (!audio) {
      throw new NotFoundException('AudioBook not found');
    }

    const filePath = path.join(__dirname, '..', '..', 'uploads', audio.audio);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Audio file not found');
    }

    const file = fs.createReadStream(filePath);
    return new StreamableFile(file);
  }

  async uploadAudio(file: Express.Multer.File, userId: number) {
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
    
    user.embedding = path.join(currentDir, '..', '..', 'sv2tts_korean', 'embeddings', `${userId}.pkl`);
    this.userRepository.save(user);
    return user;
  }
}
