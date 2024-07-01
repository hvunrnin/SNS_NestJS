import { Injectable, NotFoundException } from '@nestjs/common';
import { MoreThan, Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginatePostDto } from './dto/paginate-post.dto';
import { ConfigService } from '@nestjs/config';

// export interface PostModel{
//     id: number;
//     author: string;
//     title: string;
//     content: string;
//     likeCount: number;
//     commentCount: number;
//   }
  
//   let posts : PostModel[] = [
//     {
//       id: 1,
//       author: 'aaa',
//       title: '111',
//         content: 'qwerty',
//         likeCount: 1000000,
//         commentCount: 99999,
//     },
//     {
//       id: 2,
//       author: 'aaa',
//       title: '222',
//         content: 'wertyu',
//         likeCount: 122222,
//         commentCount: 99998,
//     },
//     {
//       id: 3,
//       author: 'bbb',
//       title: '333',
//         content: 'ertyui',
//         likeCount: 122223,
//         commentCount: 99978,
//     },
//   ]

@Injectable()
export class PostsService {
    constructor(
      @InjectRepository(PostsModel)
      private readonly postsRepository: Repository<PostsModel>,
      private readonly configService: ConfigService,
      // repository 이용해서 원하는 모델을 기반으로 DB와 소통하고 연동
    ){}

    async getAllPosts(){
      return this.postsRepository.find({
        relations:[
          'author'
        ]
      });
    }

    async generatePosts(userId: number){
      for(let i = 0; i < 3; i++){
        await this.createPost(userId,{
          title: `제목: ${i}`,
          content: `내용: ${i}`,
        });
      }
    }

    // 1) 오름차순으로 정렬하는 pagination
    async paginatePosts(dto: PaginatePostDto){
      // 1,2,3,4,5
      const posts = await this.postsRepository.find({
        where: {
          id: MoreThan(dto.where__id_more_than ?? 0), // 더 많음
        },
        order:{
          createdAt: dto.order__createdAt,
        },
        take: dto.take,
      });
        /**
     * Reponse
     * 
     * data: Data[],
     * cursor: {
     *  after: 마지막 Data의 id
     * },
     * count: 응답한 데이터의 개수
     * next: 다음 요청 시 사용할 url
     */
      return {
        data: posts,
      }
    }

    async getPostById(id: number){
      const post = await this.postsRepository.findOne({
        relations:['author'],
        where:{
          id,
        }
      });

      if(!post){
        throw new NotFoundException();
      }

      return post;
    }

    async createPost(authorId: number, postDto: CreatePostDto){
      // 1) create -> 저장할 객체를 생성한다
      // 2) save -> 객체를 저장한다 (create 메서드에서 생성한 객체로)

      const post = this.postsRepository.create({
        author:{
          id: authorId,
        },
        //title,
        //content,
        ...postDto,
        likeCount: 0,
        commentCount: 0,
      });

      const newPost = await this.postsRepository.save(post);

      return post;
    }

    async updatePost(postId: number, postDto: UpdatePostDto){
      const {title, content} = postDto;
      //save의 기능
      // 1) 만약에 데이터가 존재하지 않으면 (id 기준으로) 새로 생성
      // 2) 만약에 데이터가 존재한다면 (같은 id의 값이 존재하면) 존재하던 값을 업데이트

      const post = await this.postsRepository.findOne({
        where:{
          id: postId,
        }
      });

      if(!post){
        throw new NotFoundException();
      }
      if(title){
        post.title = title;
      }
      if(content){
        post.content = content;
      }

    
      const newPost = await this.postsRepository.save(post); // 선택한 id와 같으면 바뀐 post를, 아니면 그대로 유지
    
      return newPost;
    }

    async deletePost(postId: number){
        const post = await this.postsRepository.findOne({
          where:{
            id: postId,
          }
        });
    
        if(!post){
          throw new NotFoundException;
        }
    
        await this.postsRepository.delete(postId);
    
        return postId;
    }
}
