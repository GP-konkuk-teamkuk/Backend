import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(session({
    secret: configService.get<string>('SESSION_SECRET'),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 } // 1 hour
  }));

  //app.use((req, res, next) => {
  //  if (req.session && req.session.userId) {
  //    req.query.userId = req.session.userId;
  //    req.body.userId = req.session.userId;
  //  }
  //  next();
  //});

  const config = new DocumentBuilder()
    .setTitle('Audio API')
    .setDescription('The audio API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
