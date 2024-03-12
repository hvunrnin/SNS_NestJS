import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';

@Module({
  imports:[
    //.forRoot는 typeorm 연결 설정, .forFeature은 모델에 해당되는 레포지토리 주입할 때
    TypeOrmModule.forFeature([
      PostsModel,
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService], //여기에 가져와진 것들을 해당 모듈에서 다 쓸 수 있음
})
export class PostsModule {}
