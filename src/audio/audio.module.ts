import { Module } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../book/entities/book.entity';
import { User } from '../user/entities/user.entity';
import { AudioController } from './audio.controller';
import { AudioService } from './audio.service';
import { Audio } from './entities/audio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Audio, User, Book]), SwaggerModule],
  providers: [AudioService],
  controllers: [AudioController],
})
export class AudioModule {}
