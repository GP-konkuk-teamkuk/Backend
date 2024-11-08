import { Injectable } from '@nestjs/common';
import { CreateBookDto } from '../book/dto/create-book.dto';
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

  async uploadBook(file: Express.Multer.File, createBookDto: CreateBookDto): Promise<void> {
    const uploadPath = join(__dirname, '..', '..', 'public', 'book', file.originalname);
    await fs.writeFile(uploadPath, file.buffer);

    const textPath = join(__dirname, '..', '..', 'public', 'book', `${createBookDto.image}.txt`);
    await fs.writeFile(textPath, createBookDto.text);

    const book = this.bookRepository.create({
      image: `/public/book/${file.originalname}`,
      detail: textPath,
      title: createBookDto.title,
    });

    await this.bookRepository.save(book);
  }
}
