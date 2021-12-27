import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

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
  getAllPosts(): Promise<PostEntity[]> {
    return this.postService.getAllPosts();
  }

  @Get('/:id')
  getSinglePost(@Param('id') postId: string): Promise<PostEntity> {
    return this.postService.getSinglePost(postId);
  }

  @Post('/:id/avatar')
  @UseInterceptors(
    FileInterceptor('avatar', {
      dest: '/uploads',
      limits: {
        fileSize: 1000000,
      },
      fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          throw new BadRequestException();
        }
        cb(undefined, true);
      },
    }),
  )
  uploadPostPicture(
    @Param('id') postId: string,
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.postService.uploadPostPicture(file, user, postId);
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
  likePost(
    @Param('id') postId: string,
    @GetUser() user: User,
  ): Promise<PostEntity> {
    return this.postService.likePost(postId, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deletePost(
    @Param('id') postId: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.postService.deletePost(postId, user);
  }
}
