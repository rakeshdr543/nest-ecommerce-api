import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/shared/Entities/user.entity';
import { Post } from 'src/shared/Entities/post.entity';
import { PostsRepository } from 'src/shared/Repositories/posts.repository';
import { CreatePostDto } from './Dto/create-post.dto';
import { UpdatePostDto } from './Dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostsRepository) private postsRepository: PostsRepository,
  ) {}

  createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    return this.postsRepository.createPost(createPostDto, user);
  }

  getAllPosts() {
    return this.postsRepository.getAllPosts();
  }

  getSinglePost(id: string) {
    return this.postsRepository.getSinglePost(id);
  }

  updatePost(postId: string, user: User, updatePostDto: UpdatePostDto) {
    return this.postsRepository.updatePost(postId, user, updatePostDto);
  }

  likePost(postId: string, user: User) {
    return this.postsRepository.likePost(postId, user);
  }

  deletePost(postId: string, user: User) {
    return this.postsRepository.deletePost(postId, user);
  }
}
