import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/shared/Entities/user.entity';

import { UsersRepository } from 'src/shared/Repositories/users.repository';
import { CreateAccountDto } from './Dto/create-account.dto';
import { LoginDto } from './Dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  createUser(createAccountDto: CreateAccountDto): Promise<User> {
    return this.usersRepository.createUser(createAccountDto);
  }

  async login(loginDto: LoginDto): Promise<{
    accessToken: string;
  }> {
    const { email, password } = loginDto;

    const user = await this.usersRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email, username: user.username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
