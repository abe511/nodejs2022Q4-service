import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { CustomLoggerService } from "./custom-logger/custom-logger.service";
import { AppModule } from './app.module';
import { config } from 'dotenv';
config();

const PORT = process.env.PORT || 4444;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    // logger: new CustomLoggerService()
  });
  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true
    }),
  );

  app.useLogger(app.get(CustomLoggerService));

  await app.listen(PORT);
}
bootstrap();
