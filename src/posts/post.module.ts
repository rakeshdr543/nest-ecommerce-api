import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

import { Post } from 'src/shared/Entities/post.entity';
import { PostsRepository } from 'src/shared/Repositories/posts.repository';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostsRepository]),
    AuthModule,
    ConfigModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
