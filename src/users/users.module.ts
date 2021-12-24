import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/shared/Entities/user.entity';
import { UsersRepository } from 'src/shared/Repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([User, UsersRepository]),
    ConfigModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
