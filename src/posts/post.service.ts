import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

import { User } from 'src/shared/Entities/user.entity';
import { Post } from 'src/shared/Entities/post.entity';
import { PostsRepository } from 'src/shared/Repositories/posts.repository';
import { CreatePostDto } from './Dto/create-post.dto';
import { UpdatePostDto } from './Dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostsRepository) private postsRepository: PostsRepository,
    private configService: ConfigService,
  ) {}

  createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    return this.postsRepository.createPost(createPostDto, user);
  }

  getAllPosts(): Promise<Post[]> {
    return this.postsRepository.getAllPosts();
  }

  getSinglePost(id: string): Promise<Post> {
    return this.postsRepository.getSinglePost(id);
  }

  async uploadPostPicture(
    file: Express.Multer.File,
    user: User,
    postId: string,
  ) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUD_NAME'),
      api_key: this.configService.get('CLOUD_API_KEY'),
      api_secret: this.configService.get('CLOUD_API_SECRET'),
    });

    const post = await this.postsRepository.findOne({ id: postId });
    if (!post || post.user.id !== user.id) {
      throw new NotFoundException();
    }

    const uploadData = await cloudinary.uploader.upload(file.path);
    if (!uploadData) {
      throw new InternalServerErrorException();
    }
    post.image = uploadData.secure_url;
    await this.postsRepository.save(post);
    return uploadData.secure_url;
  }

  updatePost(
    postId: string,
    user: User,
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    return this.postsRepository.updatePost(postId, user, updatePostDto);
  }

  likePost(postId: string, user: User): Promise<Post> {
    return this.postsRepository.likePost(postId, user);
  }

  deletePost(postId: string, user: User): Promise<void> {
    return this.postsRepository.deletePost(postId, user);
  }
}
