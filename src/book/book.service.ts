import { Injectable } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async findPage(page: number, limit: number) {
    const books = await this.bookRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
    return books.map(book => {
      const imagePath = path.join(book.image);
      const image = fs.readFileSync(imagePath, 'base64');
      return {
        id: book.id,
        title: book.title,
        image: `data:image/jpeg;base64,${image}`,
        author: book.author,
        runningTime: book.runningTime,
      };
    });
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOne({ where: { id } });
    const imagePath = path.join(book.image);
    const image = fs.readFileSync(imagePath, 'base64');
    const content = fs.readFileSync(book.detail, 'utf8');
    const intro = fs.readFileSync(book.content, 'utf8');

    return {
      id: book.id,
      title: book.title,
      image,
      author: book.author,
      runningTime: book.runningTime,
      press: book.press,
      intro,
      content,
    };
  }
}
