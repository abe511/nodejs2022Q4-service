import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
// import "reflect-metadata";
import { config } from 'dotenv';
config();

const PORT = process.env.PORT || 4444;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true
    }),
  );
  await app.listen(PORT);
}
bootstrap();


