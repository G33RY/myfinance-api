import { Module } from '@nestjs/common';
import { TransactionCategoryService } from './transaction_category.service';
import { TransactionCategoryController } from './transaction_category.controller';
import { TransactionCategoryRepository } from '@/transaction_category/repositories/transaction_category.repository';

@Module({
  controllers: [TransactionCategoryController],
  providers: [TransactionCategoryService, TransactionCategoryRepository],
  exports: [TransactionCategoryService, TransactionCategoryRepository],
})
export class TransactionCategoryModule {}
