import { EntityRepository, Repository } from 'typeorm';

import { CreateCommentDto } from 'src/comments/Dto/create-comment.dto';
import { Comment } from '../Entities/comment.entity';
import { Post } from '../Entities/post.entity';

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {
  constructor() {
    super();
  }

  async createComment(
    createCommentDto: CreateCommentDto,
    post: Post,
  ): Promise<void> {
    const { body } = createCommentDto;

    const newComment = this.create({
      body,
      createdAt: new Date().toISOString(),
      post,
    });

    await this.save(newComment);
  }
}
