import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:4200', 'https://hugolevacher.com/'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Enable global validation with transformation
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  await app.listen(3000);
}
bootstrap();
