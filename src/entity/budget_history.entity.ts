import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Currency } from './currency.entity';
import { TransactionCategory } from './transaction_category.entity';

@Entity('budget_history')
export class BudgetHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Currency)
  currency: Currency;

  @ManyToOne(() => TransactionCategory)
  category: TransactionCategory;

  @Column({ type: 'enum', enum: ['weekly', 'monthly', 'yearly'] })
  periodType: 'weekly' | 'monthly' | 'yearly';

  @Column()
  periodStart: Date; // Start of the budget period

  @Column()
  periodEnd: Date; // End of the budget period

  @Column('decimal', { precision: 10, scale: 2 })
  budgetedAmount: number; // The limit set by the user

  @Column('decimal', { precision: 10, scale: 2 })
  actualSpent: number; // The total spent in that period

  @CreateDateColumn()
  createdAt: Date;
}
