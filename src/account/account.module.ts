import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AccountRepository } from './repositories/account.repository';
import { CurrencyModule } from '@/currency/currency.module';

@Module({
  imports: [CurrencyModule],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
  exports: [AccountService, AccountRepository]
})
export class AccountModule {}
