import { Controller, Get,Param } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('/api/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get(':bookId')
  findOne(@Param('bookId') bookId: number) {
    return this.bookService.findOne(bookId);
  }

  @Get(':page/:limit')
  findAll(@Param('page') page: string, @Param('limit') limit: string) {
    return this.bookService.findPage(page, limit);
  }
}
