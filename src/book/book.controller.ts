import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';

@ApiTags('book')
@Controller('/api/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('/id')
  @ApiOperation({ summary: 'Get book with pagination' })
  findPage(@Query('bookId') bookId: number) {
    return this.bookService.findOne(bookId);
  }

  @Get('/detail')
  @ApiOperation({ summary: 'Get book by ID' })
  findOne(@Query('bookId') bookId: number) {
    return this.bookService.findOne(bookId);
  }

  @Get()
  @ApiOperation({ summary: 'Get books with pagination' })
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.bookService.findPage(page, limit);
  }
}
