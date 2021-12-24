import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/shared/Entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/profile')
  getUserProfile(@GetUser() user: User) {
    return user;
  }

  @Post('/profile/avatar')
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
  async uploadProfilePicture(
    @GetUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<string> {
    return this.usersService.uploadProfilePicture(file, user);
  }

  @Delete('/profile')
  deleteUserAccount(@GetUser() user: User) {
    return this.usersService.deleteUserAccount(user);
  }
}
