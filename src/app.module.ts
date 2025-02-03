import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { AuthModule } from './auth/auth.module';
import { CurrencyModule } from './currency/currency.module';
import { CheckupModule } from './checkup/checkup.module';
import { TransactionModule } from './transaction/transaction.module';
import { CarModule } from './car/car.module';
import { BudgetModule } from './budget/budget.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    AccountModule,
    BudgetModule,
    CarModule,
    TransactionModule,
    CheckupModule,
    CurrencyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
