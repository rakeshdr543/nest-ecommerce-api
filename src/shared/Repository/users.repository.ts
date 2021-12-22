import { CreateAccountDto } from 'src/auth/Dto/create-account.dto';
import { EntityRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from '../Entities/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  constructor() {
    super();
  }

  async createUser(dto: CreateAccountDto) {
    const { fullName, email, password } = dto;
    const newUser = new User({
      id: uuid(),
      fullName,
      email,
      password,
    });

    await this.save(newUser);
  }
}
