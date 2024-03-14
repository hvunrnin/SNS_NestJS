import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //이 AppModule로부터 모듈을 확장해나가고 이 안에 있는 provider 관리하면 됨
  await app.listen(3000);
}
bootstrap();
