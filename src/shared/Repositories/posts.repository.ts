import { EntityRepository, Repository } from 'typeorm';

import { CreatePostDto } from 'src/post/Dto/create-post.dto';
import { Post } from '../Entities/post.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from '../Entities/user.entity';
import { UpdatePostDto } from 'src/post/Dto/update-post.dto';

@EntityRepository(Post)
export class PostsRepository extends Repository<Post> {
  constructor() {
    super();
  }

  async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const { title, body } = createPostDto;
    const post = await this.create({
      title,
      body: body ? body : '',
      createdAt: new Date().toISOString(),
      user,
    });

    await this.save(post);
    return post;
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

  async updatePost(postId: string, user: User, updatePostDto: UpdatePostDto) {
    const { title, body } = updatePostDto;
    const post = await this.findOne({
      where: { id: postId },
      relations: ['user'],
    });
    if (post.user.id === user.id) {
      post.title = title ? title : post.title;
      post.body = body;
      await this.save(post);
    } else {
      throw new BadRequestException();
    }
  }

  async likePost(postId: string, user: User) {
    const post = await this.findOne({
      where: { id: postId },
      relations: ['user'],
    });
    if (!post) {
      throw new NotFoundException("Post doesn't exists");
    }
    post.likes = post.likes + 1;
    await this.save(post);
  }

  async deletePost(postId: string, user: User) {
    const post = await this.findOne({
      where: { id: postId },
      relations: ['user'],
    });
    if (post.user.id === user.id) {
      await this.delete(post);
    } else {
      throw new BadRequestException();
    }
  }
}
