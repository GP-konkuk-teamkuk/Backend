import { Controller, Get, Param } from '@nestjs/common';
import { BookService } from './book.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('book')
@Controller('/api/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get(':bookId')
  @ApiOperation({ summary: 'Get book by ID' })
  findOne(@Param('bookId') bookId: number) {
    return this.bookService.findOne(bookId);
  }

  @Get(':page/:limit')
  @ApiOperation({ summary: 'Get books with pagination' })
  findAll(@Param('page') page: string, @Param('limit') limit: string) {
    return this.bookService.findPage(page, limit);
  }
}
