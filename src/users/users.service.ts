import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { v2 as cloudinary } from 'cloudinary';

import { User } from 'src/shared/Entities/user.entity';
import { UsersRepository } from 'src/shared/Repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    private configService: ConfigService,
  ) {}

  async uploadProfilePicture(
    file: Express.Multer.File,
    user: User,
  ): Promise<string> {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUD_NAME'),
      api_key: this.configService.get('CLOUD_API_KEY'),
      api_secret: this.configService.get('CLOUD_API_SECRET'),
    });

    const uploadData = await cloudinary.uploader.upload(file.path);
    if (!uploadData) {
      throw new InternalServerErrorException();
    }
    user.image = uploadData.secure_url;
    await this.usersRepository.save(user);
    return uploadData.secure_url;
  }

  deleteUserAccount(user: User): Promise<void> {
    return this.usersRepository.deleteUserAccount(user);
  }
}
