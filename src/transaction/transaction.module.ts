import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionRepository } from '@/transaction/repositories/transaction.repository';
import { RecurringTransactionRepository } from '@/transaction/repositories/recurring_transaction.repository';
import { RecurringTransactionController } from './recurring_transaction.controller';
import { RecurringTransactionService } from './recurring_transaction.service';
import { TransactionCategoryModule } from '@/transaction_category/transaction_category.module';
import { AccountModule } from '@/account/account.module';
import { CurrencyModule } from '@/currency/currency.module';

@Module({
  imports: [
    TransactionCategoryModule,
    AccountModule,
    CurrencyModule
  ],
  controllers: [
    TransactionController, RecurringTransactionController
  ],
  providers: [
    TransactionService, TransactionRepository,
    RecurringTransactionRepository, RecurringTransactionService
  ],
})
export class TransactionModule {}
