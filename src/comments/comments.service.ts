import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Comment } from 'src/shared/Entities/comment.entity';
import { CommentsRepository } from 'src/shared/Repositories/comments.repository';
import { PostsRepository } from 'src/shared/Repositories/posts.repository';
import { CreateCommentDto } from './Dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsRepository)
    private commentsRepository: CommentsRepository,
    @InjectRepository(PostsRepository) private postsRepository: PostsRepository,
  ) {}

  async createComment(
    postId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<void> {
    const post = await this.postsRepository.findOne({ id: postId });

    if (!post) {
      throw new NotFoundException();
    }
    return this.commentsRepository.createComment(createCommentDto, post);
  }

  async getPostComments(postId): Promise<Comment[]> {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ['comments'],
    });
    if (!post) {
      throw new NotFoundException();
    }
    return post.comments;
  }
}
