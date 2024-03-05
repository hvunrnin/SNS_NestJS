import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


interface Post{
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getPost(): Post {
    return {
      author: 'aaa',
      title: '111',
      content: 'qwerty',
      likeCount: 1000000,
      commentCount: 99999,
    };
  }
}
