import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsRepository } from 'src/shared/Repositories/posts.repository';
import { CreatePostDto } from './Dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostsRepository) private postsRepository: PostsRepository,
  ) {}

  createPost(createPostDto: CreatePostDto) {
    return this.postsRepository.createPost(createPostDto);
  }

  getAllPosts() {
    return this.postsRepository.getAllPosts();
  }

  getSinglePost(id: string) {
    return this.postsRepository.getSinglePost(id);
  }
}
