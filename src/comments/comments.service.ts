import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/shared/Entities/comment.entity';
import { CommentsRepository } from 'src/shared/Repositories/comments.repository';
import { CreateCommentDto } from './Dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsRepository)
    private commentsRepository: CommentsRepository,
  ) {}

  createComment(
    postId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<void> {
    return this.commentsRepository.createComment(postId, createCommentDto);
  }

  getPostComments(postId: string): Promise<Comment[]> {
    return this.commentsRepository.getPostComments(postId);
  }
}
