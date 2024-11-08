import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAudioDto } from './dto/create-audio.dto';
import { Audio } from './entities/audio.entity';
import * as fs from 'fs';
import * as path from 'path';
import { StreamableFile } from '@nestjs/common';

@Injectable()
export class AudioService {
  constructor(
    @InjectRepository(Audio)
    private audioRepository: Repository<Audio>,
  ) {}

  create(createAudioDto: CreateAudioDto) {
    return 'This action adds a new audio';
  }

  async findOne(bookId: number, userId: number): Promise<StreamableFile> {
    const audio = await this.audioRepository.findOne({
      where: {
        book: { id: bookId },
        user: { id: userId },
      },
      select: ['audioBook'],
    });
    if (!audio) {
      throw new NotFoundException('AudioBook not found');
    }

    const filePath = path.join(__dirname, '..', '..', 'uploads', audio.audioBook);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('Audio file not found');
    }

    const file = fs.createReadStream(filePath);
    return new StreamableFile(file);
  }
}
