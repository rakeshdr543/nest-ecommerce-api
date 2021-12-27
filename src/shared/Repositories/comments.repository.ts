import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from 'src/comments/Dto/create-comment.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Comment } from '../Entities/comment.entity';
import { PostsRepository } from './posts.repository';

@EntityRepository(Comment)
export class CommentsRepository extends Repository<Comment> {
  constructor(
    @InjectRepository(PostsRepository) private postsRepository: PostsRepository,
  ) {
    super();
  }

  async createComment(
    postId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<void> {
    const { body } = createCommentDto;
    const post = await this.postsRepository.findOneOrFail({ id: postId });

    if (!post) {
      throw new NotFoundException();
    }

    const newComment = this.create({
      body,
      createdAt: new Date().toISOString(),
      post,
    });

    await this.save(newComment);
  }

  async getPostComments(postId: string): Promise<Comment[]> {
    const post = await this.postsRepository.findOneOrFail({ id: postId });

    if (!post) {
      throw new NotFoundException();
    }

    return post.comments;
  }
}
