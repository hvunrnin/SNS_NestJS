// import { Test, TestingModule } from '@nestjs/testing';
// import { PostsService } from './posts.service';

// describe('PostsService', () => {
//   let service: PostsService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [PostsService],
//     }).compile();

//     service = module.get<PostsService>(PostsService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';
import { ConfigService } from '@nestjs/config';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
