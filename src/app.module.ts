import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './posts/entities/posts.entity';

@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      //데이터베이스 타입
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [
        PostsModel,
      ],
      synchronize: true, // 개발환경에서는 true가 편한데, 프로덕션 환경에선 맘대로 DB 구조가 바뀔 수 있어서 false로 자동 싱크 맞추기 해제하기
    }),
  ], // 다른 module 불러오는 거
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
