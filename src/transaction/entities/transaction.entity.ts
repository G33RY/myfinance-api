import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

import { Account } from '@/account/entities/account.entity';
import { Currency } from '@/currency/entities/currency.entity';
import { User } from '@/auth/entities/user.entity';
import { TransactionCategory } from '@/transaction_category/entities/transaction_category.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  date: Date;

  @Column({ type: 'enum', enum: ['cash', 'card'] })
  type: 'cash' | 'card';

  @Column({ type: 'enum', enum: ['income', 'expense', 'transfer'] })
  transactionType: 'income' | 'expense' | 'transfer';

  @ManyToOne(() => TransactionCategory, { nullable: true })
  category?: TransactionCategory;

  @ManyToOne(() => Currency)
  currency: Currency;

  @ManyToOne(() => Account, { nullable: true })
  relatedAccount?: Account;

  @ManyToOne(() => Account, { nullable: true })
  recipientAccount?: Account;

  @Column({ type: 'jsonb', nullable: true })
  tags?: string[];

  @CreateDateColumn()
  createdAt: Date;
}
