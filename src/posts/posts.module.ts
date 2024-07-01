import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModel } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[
    JwtModule.register({}),
    //.forRoot는 typeorm 연결 설정, .forFeature은 모델에 해당되는 레포지토리 주입할 때
    TypeOrmModule.forFeature([
      PostsModel,
      UsersModel,
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService, AuthService, UsersService,ConfigService], //여기에 가져와진 것들을 해당 모듈에서 다 쓸 수 있음
})
export class PostsModule {}
