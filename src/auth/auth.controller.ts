import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() authDto: AuthDto): Promise<Record<string, string>> {
    return await this.authService.register(authDto);
  }

  @Post('login')
  async login(@Body() authDto: AuthDto): Promise<Record<string, string>> {
    return this.authService.login(authDto);
  }
}
