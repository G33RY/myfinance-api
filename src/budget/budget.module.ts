import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { BudgetRepository } from '@/budget/repositories/budget.repository';
import { BudgetHistoryRepository } from '@/budget/repositories/budget_history.repository';
import { CurrencyModule } from '@/currency/currency.module';
import { TransactionCategoryModule } from '@/transaction_category/transaction_category.module';

@Module({
  imports: [CurrencyModule, TransactionCategoryModule],
  controllers: [BudgetController],
  providers: [BudgetService, BudgetRepository, BudgetHistoryRepository],
  exports: [BudgetService, BudgetRepository, BudgetHistoryRepository],
})
export class BudgetModule {}
