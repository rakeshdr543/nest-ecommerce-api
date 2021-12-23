import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreatePostDto } from './Dto/create-post.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard())
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get('/:id')
  getSinglePost(@Param('id') postId: string) {
    return this.postService.getSinglePost(postId);
  }
}
