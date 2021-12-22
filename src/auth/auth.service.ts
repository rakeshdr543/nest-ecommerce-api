import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from 'src/shared/Repository/users.repository';
import { CreateAccountDto } from './Dto/create-account.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {}

  async createUser(dto: CreateAccountDto) {
    const userExists = await this.usersRepository.findOne({ email: dto.email });
    if (userExists) {
      throw new BadRequestException('Account already exists');
    }
    await this.usersRepository.createUser(dto);
  }
}
