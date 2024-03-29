import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //이 AppModule로부터 모듈을 확장해나가고 이 안에 있는 provider 관리하면 됨

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
