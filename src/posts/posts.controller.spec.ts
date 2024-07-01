// import { Test, TestingModule } from '@nestjs/testing';
// import { PostsController } from './posts.controller';
// import { PostsService } from './posts.service';

// describe('PostsController', () => {
//   let controller: PostsController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [PostsController],
//       providers: [PostsService],
//     }).compile();

//     controller = module.get<PostsController>(PostsController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });
import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenGuard } from '../auth/guard/bearer-token.guard';

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(PostsModel),
          useValue: {}, // 여기에 mock repository를 넣을 수 있습니다.
        },
        {
          provide: ConfigService,
          useValue: {}, // 여기에 mock ConfigService를 넣을 수 있습니다.
        },
        {
          provide: AuthService,
          useValue: {}, // 여기에 mock AuthService를 넣을 수 있습니다.
        },
        {
          provide: UsersService,
          useValue: {}, // 여기에 mock UsersService를 넣을 수 있습니다.
        },
        {
          provide: JwtService,
          useValue: {}, // 여기에 mock JwtService를 넣을 수 있습니다.
        },
        {
          provide: AccessTokenGuard,
          useValue: {}, // 여기에 mock AccessTokenGuard를 넣을 수 있습니다.
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
