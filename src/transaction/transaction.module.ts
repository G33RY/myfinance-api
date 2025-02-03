import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionRepository } from '@/transaction/repositories/transaction.repository';
import { RecurringTransactionRepository } from '@/transaction/repositories/recurring_transaction.repository';
import { TransactionCategoryRepository } from '@/transaction/repositories/transaction_category.repository';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository, RecurringTransactionRepository, TransactionCategoryRepository],
})
export class TransactionModule {}
