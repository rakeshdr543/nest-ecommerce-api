import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/shared/Entities/user.entity';

import { AuthService } from './auth.service';
import { CreateAccountDto } from './Dto/create-account.dto';
import { LoginDto } from './Dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createAccountDto: CreateAccountDto): Promise<User> {
    return this.authService.createUser(createAccountDto);
  }

  @Post('signin')
  signIn(@Body() loginDto: LoginDto): Promise<{
    accessToken: string;
  }> {
    return this.authService.login(loginDto);
  }
}
