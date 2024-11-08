import { Injectable } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async findPage(page: string, limit: string) {
    const books = await this.bookRepository.find({
      skip: (parseInt(page) - 1) * parseInt(limit),
      take: parseInt(limit),
    });
    return books.map(book => {
      book.image = `/public/book/${book.image}`;
      book.detail = `/public/book/${book.detail}`;
      return book;
    });
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (book) {
      book.image = `/public/book/${book.image}`;
      book.detail = `/public/book/${book.detail}`;
    }
    return book;
  }
}
