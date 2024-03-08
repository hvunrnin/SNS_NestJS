import { Controller, Get, NotFoundException, Param, Post, Body, Put, Delete} from '@nestjs/common';
import { PostsService } from './posts.service';


interface PostModel{
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts : PostModel[] = [
  {
    id: 1,
    author: 'aaa',
    title: '111',
      content: 'qwerty',
      likeCount: 1000000,
      commentCount: 99999,
  },
  {
    id: 2,
    author: 'aaa',
    title: '222',
      content: 'wertyu',
      likeCount: 122222,
      commentCount: 99998,
  },
  {
    id: 3,
    author: 'bbb',
    title: '333',
      content: 'ertyui',
      likeCount: 122223,
      commentCount: 99978,
  },
]

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // 1) GET /posts
  //    모든 POST를 다 가져온다
  @Get()
  getPosts(){
    return posts;
  }

  // 2) GET /posts/:id
  //    id에 해당되는 POST를 가져온다
  @Get(':id')
  getPost(@Param('id') id: string){
    const post = posts.find((post) => post.id === +id);
    
    if(!post){
      throw new NotFoundException;
    }
    
    return post;
  }

  // 3) POST /posts
  //    POST를 생성한다
  @Post()
  postPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ){
    const post : PostModel = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    posts = [
      ...posts,
      post,
    ];

    return post;
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
    const post = posts.find(post => post.id === +id);

    if(!post){
      throw new NotFoundException();
    }

    if(author){
      post.author = author;
    }
    if(title){
      post.title = title;
    }
    if(content){
      post.content = content;
    }

    posts = posts.map(prevPost => prevPost.id === +id ? post : prevPost); // 선택한 id와 같으면 바뀐 post를, 아니면 그대로 유지

    return post;
  }

  // 5) DELETE /posts/:od
  //    id에 해당되는 POST를 삭제한다
  @Delete(':id')
  deletePost(
    @Param('id') id: string,
  ){
    const post = posts.find((post) => post.id === +id);
    
    if(!post){
      throw new NotFoundException;
    }
    
    posts = posts.filter(post => post.id !== +id);

    return id;
  }
}
