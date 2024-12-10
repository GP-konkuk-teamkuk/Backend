import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfigFactory = (configService: ConfigService) => {
  const TYPEORM_PRODUCTION_CONFIGS: TypeOrmModuleOptions = {
    type: 'mysql',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: false,
  };
  const TYPEORM_TEST_CONFIGS: TypeOrmModuleOptions = {
    type: 'mysql',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
  };
  if (configService.get<string>('NODE_ENV') === 'production') return TYPEORM_PRODUCTION_CONFIGS;
  else return TYPEORM_TEST_CONFIGS;
};
