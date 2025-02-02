import { Global, Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AccountRepository } from './account.repository';
import { BudgetRepository } from './budget.repository';
import { BudgetHistoryRepository } from './budget_history.repository';
import { CarRepository } from './car.repository';
import { CarEventRepository } from './car_event.repository';
import { CarMaintenanceReminderRepository } from './car_maintenance_reminder.repository';
import { CheckupHistoryRepository } from './checkup_history.repository';
import { CurrencyRepository } from './currency.repository';
import { RecurringTransactionRepository } from './recurring_transaction.repository';
import { TransactionRepository } from './transaction.repository';
import { TransactionCategory } from '../entity/transaction_category.entity';

@Global()
@Module({
  providers: [
    UserRepository,
    AccountRepository,
    BudgetRepository,
    BudgetHistoryRepository,
    CarRepository,
    CarEventRepository,
    CarMaintenanceReminderRepository,
    CheckupHistoryRepository,
    CurrencyRepository,
    RecurringTransactionRepository,
    TransactionRepository,
    TransactionCategory
  ],
  exports: [
    UserRepository,
    AccountRepository,
    BudgetRepository,
    BudgetHistoryRepository,
    CarRepository,
    CarEventRepository,
    CarMaintenanceReminderRepository,
    CheckupHistoryRepository,
    CurrencyRepository,
    RecurringTransactionRepository,
    TransactionRepository,
    TransactionCategory
  ],
})
export class RepositoryModule {}
