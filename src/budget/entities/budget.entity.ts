import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Currency } from '@/currency/entities/currency.entity';
import { User } from '@/auth/entities/user.entity';
import { TransactionCategory } from '@/transaction_category/entities/transaction_category.entity';


@Entity('budgets')
export class Budget {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Currency)
  currency: Currency; // USD, EUR, etc.

  @ManyToOne(() => TransactionCategory)
  category: TransactionCategory; // Food, Rent, Travel, etc.

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number; // Maximum budget allowed

  @Column({ type: 'enum', enum: ['weekly', 'monthly', 'yearly'] })
  periodType: 'weekly' | 'monthly' | 'yearly'; // Defines the budget cycle

  @CreateDateColumn()
  createdAt: Date;
}
