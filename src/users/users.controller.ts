import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/decorators';

@Controller('users')
export class UsersController {
  @Get()
  @UseGuards(AuthGuard('jwt'))
  hi(@User() u: any) {
    return u;
  }
}
