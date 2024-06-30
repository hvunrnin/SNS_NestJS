import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //이 AppModule로부터 모듈을 확장해나가고 이 안에 있는 provider 관리하면 됨

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  })); 
  // create-post.dto 처럼 만들어낸 모든 클래스 validator들의 annotation(isString 등) 따로 추가 안 하고 앱 전반적으로 전부 적용 가능

  const config = new DocumentBuilder()
  .setTitle('SNS')
  .setDescription('SNS API description')
  .setVersion('1.0')
  .addTag('swagger')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    name: 'JWT',
    in: 'header',
  },
  'access-token'
  )
  .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
