import { promises as fs } from 'fs';
import path from 'path';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from '../book/dto/create-book.dto';
import { Book } from '../book/entities/book.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async uploadBook(
    image: Express.Multer.File,
    content: Express.Multer.File,
    intro: Express.Multer.File,
    createBook: CreateBookDto,
  ): Promise<void> {
    const imagePath = path.join(__dirname, '..', '..', 'public', 'book', image.originalname);
    await fs.writeFile(imagePath, image.buffer);

    const contentPath = path.join(__dirname, '..', '..', 'public', 'book', content.originalname);
    await fs.writeFile(contentPath, content.buffer);

    const introPath = path.join(__dirname, '..', '..', 'public', 'book', intro.originalname);
    await fs.writeFile(contentPath, intro.buffer);

    const book = this.bookRepository.create({
      image: imagePath,
      content: contentPath,
      intro: introPath,
      title: createBook.title,
      author: createBook.author,
      runningTime: createBook.runningTime,
      press: createBook.press,
    });

    await this.bookRepository.save(book);
  }
}
