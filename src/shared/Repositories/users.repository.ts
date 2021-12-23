import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import { User } from '../Entities/user.entity';
import { UserRole } from '../Enums/role.entity';
import { CreateAccountDto } from 'src/auth/Dto/create-account.dto';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  constructor() {
    super();
  }

  async createUser(createAccountDto: CreateAccountDto) {
    const { fullName, email, password } = createAccountDto;
    const userExists = await this.findOne({ email });
    if (userExists) {
      throw new BadRequestException('Account already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      id: uuid(),
      fullName,
      email,
      password: hashedPassword,
      isActive: true,
      role: UserRole.USER,
    });

    await this.save(newUser);
  }
}
