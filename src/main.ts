import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';

async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(
      AppModule,
    );

  app.useStaticAssets(
    join(__dirname, '..', 'uploads'),
    {
      prefix: '/uploads/',
    },
  );

  const config = new DocumentBuilder()
    .setTitle('Resep Kuliner API')
    .setDescription('Dokumentasi API UKL')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
  );
console.log('SWAGGER BERJALAN');
  SwaggerModule.setup(
    'api',
    app,
    document,
  );

  await app.listen(process.env.PORT || 3000);
}

bootstrap();