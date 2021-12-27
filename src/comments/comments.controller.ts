import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Comment } from 'src/shared/Entities/comment.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './Dto/create-comment.dto';

@Controller('/posts/:id/comments')
@UseGuards(AuthGuard())
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Post()
  createComment(
    @Param('id') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<void> {
    return this.commentService.createComment(postId, createCommentDto);
  }

  @Get()
  getPostComments(@Param('id') postId: string): Promise<Comment[]> {
    return this.commentService.getPostComments(postId);
  }
}
