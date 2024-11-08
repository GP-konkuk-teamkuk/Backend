import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '../book/dto/create-book.dto';
import { join } from 'path';
import { promises as fs } from 'fs';

@Injectable()
export class AdminService {
  async uploadBookImage(file: Express.Multer.File): Promise<string> {
    const uploadPath = join(__dirname, '..', '..', 'public', 'book', file.originalname);
    await fs.writeFile(uploadPath, file.buffer);
    return `/public/book/${file.originalname}`;
  }

  async saveBookText(createBookDto: CreateBookDto): Promise<void> {
    const textPath = join(__dirname, '..', '..', 'public', 'book', `${createBookDto.image}.txt`);
    await fs.writeFile(textPath, createBookDto.text);
  }
}
