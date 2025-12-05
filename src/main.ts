import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 3000;
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
  console.log(`✅ Server is running on http://0.0.0.0:${port}`);
}

bootstrap();