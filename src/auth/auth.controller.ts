import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAccountDto } from './Dto/create-account.dto';
import { LoginDto } from './Dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() createAccountDto: CreateAccountDto) {
    return this.authService.createUser(createAccountDto);
  }

  @Post('signin')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
