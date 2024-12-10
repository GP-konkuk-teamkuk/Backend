import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function useSwagger(app: INestApplication) {
	const config = new DocumentBuilder()
    .setTitle('팀쿡 Audio API')
    .setDescription('팀쿡 audio API description')
    .setVersion('0.0.2')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}
