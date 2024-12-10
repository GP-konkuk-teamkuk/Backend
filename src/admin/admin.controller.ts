import { Controller, Post, UploadedFiles, UseInterceptors, Body } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AdminService } from './admin.service';
import { CreateBookDto } from '../book/dto/create-book.dto';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('admin')
@Controller('manage')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('books')
  @ApiOperation({ summary: 'Upload a book' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Book upload',
    type: CreateBookDto,
  })
  @UseInterceptors(FilesInterceptor('files', 2))
  async uploadBook(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createBookDto: CreateBookDto,
  ): Promise<void> {
    const [image, text] = files;
    await this.adminService.uploadBook(image, text, createBookDto);
  }
}
