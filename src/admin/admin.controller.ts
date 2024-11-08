import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminService } from './admin.service';
import { CreateBookDto } from '../book/dto/create-book.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadBookImage(@UploadedFile() file: Express.Multer.File): Promise<string> {
    return this.adminService.uploadBookImage(file);
  }

  @Post('save-text')
  async saveBookText(@Body() createBookDto: CreateBookDto): Promise<void> {
    return this.adminService.saveBookText(createBookDto);
  }
}
