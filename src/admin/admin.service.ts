import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { promises as fs } from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../book/entities/book.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async uploadBook(image: Express.Multer.File, text: Express.Multer.File, title: string): Promise<void> {
    const imagePath = join(__dirname, '..', '..', 'public', 'book', image.originalname);
    await fs.writeFile(imagePath, image.buffer);

    const textPath = join(__dirname, '..', '..', 'public', 'book', text.originalname);
    await fs.writeFile(textPath, text.buffer);

    const book = this.bookRepository.create({
      image: imagePath,
      detail: textPath,
      title: title,
    });

    await this.bookRepository.save(book);
  }
}
