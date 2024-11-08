import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminService } from './admin.service';
import { CreateBookDto } from '../book/dto/create-book.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('admin')
@Controller('manage')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('books')
  @ApiOperation({ summary: 'Upload a book' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadBook(@UploadedFile() file: Express.Multer.File, @Body() createBookDto: CreateBookDto): Promise<void> {
    await this.adminService.uploadBook(file, createBookDto);
  }
}
