import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';


@Controller('account')
@UseGuards(AuthGuard)
export class AccountController {

  @Get()
  getAccount() {
    return {
      id: 1,
      username: 'john.doe',
      email: ''
    };
  }
}
