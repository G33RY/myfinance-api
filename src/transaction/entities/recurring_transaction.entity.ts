import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

import { Account } from '@/account/entities/account.entity';
import { Currency } from '@/currency/entities/currency.entity';
import { User } from '@/auth/entities/user.entity';
import { TransactionCategory } from '@/transaction_category/entities/transaction_category.entity';
import { Transaction } from '@/transaction/entities/transaction.entity';


@Entity('recurring_transactions')
export class RecurringTransaction extends Transaction{

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
}
