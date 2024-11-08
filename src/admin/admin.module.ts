import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { BookModule } from '../book/book.module';

@Module({
  imports: [BookModule], // Import BookModule to make Book entity available
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
