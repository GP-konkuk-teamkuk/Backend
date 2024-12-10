import { INestApplication } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const setCors = (app: INestApplication) => {
  // test cors
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };
  app.enableCors(corsOptions);
};
