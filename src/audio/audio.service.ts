import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAudioDto } from './dto/create-audio.dto';
import { Audio } from './entities/audio.entity';
import * as fs from 'fs';
import * as path from 'path';
import { StreamableFile } from '@nestjs/common';
import { execSync } from 'child_process';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AudioService {
  constructor(
    @InjectRepository(Audio)
    private audioRepository: Repository<Audio>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createAudioDto: CreateAudioDto) {
    const { bookId, userId, audioPath } = createAudioDto;

    // Execute the embedding extraction script
    const currentDir = __dirname;
    const command = `python ${path.join(currentDir, '..', '..', 'sv2tts_korean', 'embedding_extraction.py')} --ref_voice_path "${audioPath}" --hash ${userId}_${bookId}`;
    execSync(command);

    // Save the embedding path to the user entity
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.embedding = path.join(currentDir, '..', '..', 'sv2tts_korean', 'embeddings', `${userId}.pkl`);
    await this.userRepository.save(user);

    return 'Embedding created and saved to user entity';
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
