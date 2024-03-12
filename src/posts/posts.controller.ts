import { Controller, Get, NotFoundException, Param, Post, Body, Put, Delete} from '@nestjs/common';
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
  getPost(@Param('id') id: string){
    return this.postsService.getPostById(+id);
  }

  // 3) POST /posts
  //    POST를 생성한다
  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ){
    return this.postsService.createPost(
      author, title, content,
    );
  }

  // 4) PUT /posts/:id
  //    id에 해당되는 POST를 변경한다
  @Put(':id')
  putPost( // 하나의 요소만 바꾸고 싶을 때
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ){
    return this.postsService.updatePost(
      +id, author, title, content,
    );
  }

  // 5) DELETE /posts/:id
  //    id에 해당되는 POST를 삭제한다
  @Delete(':id')
  deletePost(
    @Param('id') id: string,
  ){
    return this.postsService.deletePost(+id);
  }
}
