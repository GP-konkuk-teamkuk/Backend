import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Body,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { CreateBookDto } from '../book/dto/create-book.dto';
import { AdminService } from './admin.service';

@ApiTags('manage')
@Controller('manage')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  //TODO : not work
  @Post('books')
  @ApiOperation({ summary: 'Upload a book' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateBookDto })
  @UseInterceptors(FilesInterceptor('files', 3))
  async uploadBook(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createBookDto: CreateBookDto,
  ): Promise<void> {
    const [image, content, intro] = files;
    console.log('Uploaded Files:', files); // 디버깅용 로그
    console.log('CreateBookDto:', createBookDto); // 디버깅용 로그
    await this.adminService.uploadBook(image, content, intro, createBookDto);
  }

  //@Post('books')
  //@ApiOperation({ summary: 'Upload a book' })
  //@ApiConsumes('multipart/form-data')
  //@ApiBody({
  //  description: 'Book upload',
  //  type: CreateBookDto,
  //})
  //@UseInterceptors(FileInterceptor('image'), FileInterceptor('content'), FileInterceptor('intro'))
  //async uploadBook(
  //  @UploadedFile() image: Express.Multer.File,
  //  @UploadedFile() content: Express.Multer.File,
  //  @UploadedFile() intro: Express.Multer.File,
  //  @Body() createBookDto: CreateBookDto,
  //): Promise<void> {
  //  console.log('hello');
  //  //const [image, content, intro] = files;
  //  //await this.adminService.uploadBook(image, content, intro, createBookDto);
  //}
}
