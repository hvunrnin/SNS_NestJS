import { Controller, Get, NotFoundException, Param, Post, Body, Put, Delete, ParseIntPipe, DefaultValuePipe, UseGuards, Request, Patch, Query} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AccessTokenGuard } from '../auth/guard/bearer-token.guard';
import { UsersModel } from '../users/entities/users.entity';
import { User } from '../users/decorator/user.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { query } from 'express';
import { PaginatePostDto } from './dto/paginate-post.dto';



@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET /posts
  //    모든 POST를 다 가져온다
  @Get()
  getPosts(){
    return this.postsService.getAllPosts();
  }

  @Post('random')
  @UseGuards(AccessTokenGuard)
  async postRandom(@User() user: UsersModel){ 
    await this.postsService.generatePosts(user.id);
    return true;
  }

  @Get('pagination')
  getPosts_pagination(
    @Query() query: PaginatePostDto,
  ){
    return this.postsService.paginatePosts(query);
  }

  // 2) GET /posts/:id
  //    id에 해당되는 POST를 가져온다
  @Get(':id')
  getPost(@Param('id', ParseIntPipe) id: number){
    return this.postsService.getPostById(id);
  }

  // 3) POST /posts
  //    POST를 생성한다
  //
  // DTO - Data Transfer Object
  @Post()
  @UseGuards(AccessTokenGuard) // 다른 사용자 이름으로 글 못 쓰게
  postPosts(
    //@Request() req:any,
    @User('id') userId: number,
    //@Body('authorId') authorId: number,

    //@Body('title') title: string,
    //@Body('content') content: string,
    @Body() body: CreatePostDto,
    // @Body('isPublic', new DefaultValuePipe(true)) isPublic: boolean,
  ){
    //const authorId = req.user.id;
    return this.postsService.createPost(
      userId, body,
    );
  }

  // 4) PATCH /posts/:id
  //    id에 해당되는 POST를 변경한다
  @Patch(':id')
  patchPost( // 하나의 요소만 바꾸고 싶을 때
    @Param('id', ParseIntPipe) id: number,
    // @Body('title') title?: string,
    // @Body('content') content?: string,
    @Body() body: UpdatePostDto,
  ){
    return this.postsService.updatePost(
      id, body,
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
