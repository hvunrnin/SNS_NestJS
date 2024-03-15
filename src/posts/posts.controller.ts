import { Controller, Get, NotFoundException, Param, Post, Body, Put, Delete, ParseIntPipe, DefaultValuePipe} from '@nestjs/common';
import { PostsService } from './posts.service';



@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET /posts
  //    모든 POST를 다 가져온다
  @Get()
  getPosts(){
    return this.postsService.getAllPosts();
  }

  // 2) GET /posts/:id
  //    id에 해당되는 POST를 가져온다
  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number){
    return this.postsService.getPostById(id);
  }

  // 3) POST /posts
  //    POST를 생성한다
  @Post()
  postPosts(
    @Body('authorId') authorId: number,
    @Body('title') title: string,
    @Body('content') content: string,
    // @Body('isPublic', new DefaultValuePipe(true)) isPublic: boolean,
  ){
    return this.postsService.createPost(
      authorId, title, content,
    );
  }

  // 4) PUT /posts/:id
  //    id에 해당되는 POST를 변경한다
  @Put(':id')
  putPost( // 하나의 요소만 바꾸고 싶을 때
    @Param('id', ParseIntPipe) id: number,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ){
    return this.postsService.updatePost(
      +id, title, content,
    );
  }

  // 5) DELETE /posts/:id
  //    id에 해당되는 POST를 삭제한다
  @Delete(':id')
  deletePost(
    @Param('id', ParseIntPipe) id: number,
  ){
    return this.postsService.deletePost(+id);
  }
}
