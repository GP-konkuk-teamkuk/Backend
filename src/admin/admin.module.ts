import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { BookModule } from '../book/book.module';

@Module({
  imports: [BookModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
