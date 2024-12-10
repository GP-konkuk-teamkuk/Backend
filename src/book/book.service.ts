import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

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

  async splitAndMergeByNewline(filename: string): Promise<string> {
    const file = await fs.promises.readFile(filename, 'utf8');
    return file.split('.').reduce((prev, cur) => {
      prev += cur + '.\n\t';
      return prev;
    }, '');
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOne({ where: { id } });
    const imagePath = path.join(book.image);
    //const image = fs.readFileSync(imagePath, 'base64');
    //const content = fs
    //  .readFileSync(book.detail, 'utf8')
    //  .split('.')
    //  .reduce((prev, cur) => {
    //    prev += cur + '.\n\t';
    //    return prev;
    //  }, '');

    //const intro = fs
    //  .readFileSync(book.content, 'utf8')
    //  .split('.')
    //  .reduce((prev, cur) => {
    //    prev += cur + '.\n\t';
    //    return prev;
    //  }, '');
    const image = await fs.promises.readFile(imagePath, 'base64');
    const content = await this.splitAndMergeByNewline(book.detail);
    const intro = await this.splitAndMergeByNewline(book.content);

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
