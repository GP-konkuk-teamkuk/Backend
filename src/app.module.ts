import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { AudioModule } from './audio/audio.module';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { typeormConfigFactory } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => typeormConfigFactory(configService),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    UserModule,
    AdminModule,
    AudioModule,
    BookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
