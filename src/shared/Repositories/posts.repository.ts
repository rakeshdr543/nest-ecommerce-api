import { EntityRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { CreatePostDto } from 'src/post/Dto/create-post.dto';
import { Post } from '../Entities/post.entity';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  constructor() {
    super();
  }

  async createPost(createPostDto: CreatePostDto) {
    const { title, body } = createPostDto;
    const post = await this.create({
      id: uuid(),
      title,
      body: body ? body : '',
      likes: 0,
    });

    await this.save(post);
  }

  async getAllPosts() {
    return this.find({});
  }

  async getSinglePost(id: string) {
    const post = await this.findOne({ id });
    if (!post) {
      throw new NotFoundException("Post doesn't exists");
    }
    return post;
  }
}
