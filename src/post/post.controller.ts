import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { Post as PostEntity } from 'src/shared/Entities/post.entity';
import { User } from 'src/shared/Entities/user.entity';

import { CreatePostDto } from './Dto/create-post.dto';
import { UpdatePostDto } from './Dto/update-post.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard())
  createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<PostEntity> {
    return this.postService.createPost(createPostDto, user);
  }

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get('/:id')
  getSinglePost(@Param('id') postId: string) {
    return this.postService.getSinglePost(postId);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updatePost(
    @Param('id') postId: string,
    @GetUser() user: User,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.updatePost(postId, user, updatePostDto);
  }

  @Patch('/:id/like')
  @UseGuards(AuthGuard())
  likePost(@Param('id') postId: string, @GetUser() user: User) {
    return this.postService.likePost(postId, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deletePost(@Param('id') postId: string, @GetUser() user: User) {
    return this.postService.deletePost(postId, user);
  }
}
