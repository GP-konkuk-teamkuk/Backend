import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { setCors } from './config/cors.config';
import { useSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.use(
    session({
      secret: configService.get<string>('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 }, // 1 hour
    }),
  );

  app.use((req, res, next) => {
    if (req.session && req.session.userId) {
      req.body.userId = req.session.userId;
    }
    next();
  });

  setCors(app);
  useSwagger(app);

  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
