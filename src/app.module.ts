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
import { GlobalModule } from './global.module';
import { ContextModule } from '@/context/context.module';

@Module({
  imports: [
    ContextModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    GlobalModule,
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
