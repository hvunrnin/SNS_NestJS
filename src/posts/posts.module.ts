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
import { CommonModule } from 'src/common/common.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[
    JwtModule.register({}),
    //.forRoot는 typeorm 연결 설정, .forFeature은 모델에 해당되는 레포지토리 주입할 때
    TypeOrmModule.forFeature([
      PostsModel,
      UsersModel,
    ]),
    AuthModule,
    CommonModule,
    MulterModule.register({
      limits:{
        // byte 단위로 입력
        fileSize: 10000000,
      },
      fileFilter:()=>(req,file,cb)=>{
        /**
         * cb(에러, boolean)
         * 
         * 첫번째 파라미터에는 에러가 있을 경우 에러 정보 넣기
         * 두번째 파라미터는 파일을 받을지 말지 boolean 넣기
         */
      }
    })
  ],
  controllers: [PostsController],
  providers: [PostsService, AuthService, UsersService,ConfigService], //여기에 가져와진 것들을 해당 모듈에서 다 쓸 수 있음
})
export class PostsModule {}
