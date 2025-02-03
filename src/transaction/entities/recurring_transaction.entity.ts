import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

import { Account } from '@/account/entities/account.entity';
import { Currency } from '@/currency/entities/currency.entity';
import { User } from '@/auth/entities/user.entity';

@Entity('recurring_transactions')
export class RecurringTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: ['cash', 'card'] })
  type: 'cash' | 'card';

  @Column({ type: 'enum', enum: ['income', 'expense', 'transfer'] })
  transactionType: 'income' | 'expense' | 'transfer';

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  category?: string;

  @ManyToOne(() => Currency)
  currency: Currency;

  @ManyToOne(() => Account, { nullable: true })
  relatedAccount?: Account;

  @Column({ type: 'enum', enum: ['daily', 'weekly', 'monthly', 'yearly', 'custom'] })
  recurrenceType: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';

  @Column({ nullable: true })
  intervalCount?: number;

  @Column({ nullable: true })
  dayOfPayment?: number;

  @Column({ nullable: true, type: 'enum', enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] })
  specificWeekday?: string;

  @Column()
  autoAdd: boolean;

  @Column({ nullable: true })
  endDate?: Date;

  @CreateDateColumn()
  createdAt: Date;
}
