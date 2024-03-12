import { Injectable, NotFoundException } from '@nestjs/common';

export interface PostModel{
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

@Injectable()
export class PostsService {
    getAllPosts(){
        return posts;
    }

    getPostById(id: number){
        const post = posts.find((post) => post.id === +id);
    
        if(!post){
          throw new NotFoundException;
        }
        
        return post;
    }

    createPost(author: string, title: string, content: string){
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

    updatePost(postId: number, author: string, title: string, content: string){
        const post = posts.find(post => post.id === postId);

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
    
        posts = posts.map(prevPost => prevPost.id === postId ? post : prevPost); // 선택한 id와 같으면 바뀐 post를, 아니면 그대로 유지
    
        return post;
    }

    deletePost(postId: number){
        const post = posts.find((post) => post.id === postId);
    
        if(!post){
          throw new NotFoundException;
        }
    
        posts = posts.filter(post => post.id !== postId);
    
        return postId;
    }
}
