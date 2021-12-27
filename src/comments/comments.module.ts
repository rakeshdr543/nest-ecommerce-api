import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';
import { PostModule } from 'src/posts/post.module';
import { Comment } from 'src/shared/Entities/comment.entity';
import { Post } from 'src/shared/Entities/post.entity';
import { CommentsRepository } from 'src/shared/Repositories/comments.repository';
import { PostsRepository } from 'src/shared/Repositories/posts.repository';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Comment,
      CommentsRepository,
      PostsRepository,
      Post,
    ]),
    AuthModule,
    PostModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
