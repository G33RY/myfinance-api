import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { BudgetRepository } from '@/budget/repositories/budget.repository';
import { BudgetHistoryRepository } from '@/budget/repositories/budget_history.repository';

@Module({
  controllers: [BudgetController],
  providers: [BudgetService, BudgetRepository, BudgetHistoryRepository],
  exports: [BudgetService, BudgetRepository, BudgetHistoryRepository],
})
export class BudgetModule {}
