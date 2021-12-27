import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../Entities/user.entity';
import { UserRole } from '../Enums/role.enum';
import { CreateAccountDto } from 'src/auth/Dto/create-account.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  constructor() {
    super();
  }

  async createUser(createAccountDto: CreateAccountDto): Promise<User> {
    const { username, email, password } = createAccountDto;
    const userExists = await this.findOne({ email });
    if (userExists) {
      throw new BadRequestException('Account already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: UserRole.USER,
      createdAt: new Date().toISOString(),
    });

    await this.save(newUser);
    return newUser;
  }

  async deleteUserAccount(user: User): Promise<void> {
    user.isActive = false;
    await this.save(user);
  }
}
