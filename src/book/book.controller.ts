import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { BookService } from './book.service';

@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // deprecated
  //@Get('/id')
  //@ApiOperation({ summary: 'Get book with pagination' })
  //@ApiResponse({
  //  status: 200,
  //  description: 'The found book',
  //  schema: {
  //    type: 'object',
  //    properties: {
  //      id: { type: 'number', example: 1 },
  //      title: { type: 'string', example: 'Book Title' },
  //      image: { type: 'string', example: 'data:image/jpeg;base64,...' },
  //    },
  //  },
  //})
  //findPage(@Query('bookId') bookId: number) {
  //  return this.bookService.findOne(bookId);
  //}

  @Get('/detail')
  @ApiOperation({ summary: 'Get book by ID' })
  @ApiResponse({
    status: 200,
    description: 'The found book',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        title: { type: 'string', example: 'Book Title' },
        image: { type: 'string', example: 'data:image/jpeg;base64,...' },
      },
    },
  })
  findBookById(@Query('bookId') bookId: number) {
    const result = this.bookService.findOne(bookId);
    result.then(val => console.log(JSON.stringify(val)));
    return result;
  }

  @Get()
  @ApiOperation({ summary: 'Get books with pagination' })
  @ApiResponse({
    status: 200,
    description: 'The list of books',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          title: { type: 'string', example: 'Book Title' },
          image: { type: 'string', example: 'data:image/jpeg;base64,...' },
        },
      },
    },
  })
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.bookService.findPage(page, limit);
  }
}
