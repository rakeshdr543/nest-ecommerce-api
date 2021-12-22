import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/shared/Entities/user.entity';
import { UsersRepository } from 'src/shared/Repository/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, UsersRepository])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
