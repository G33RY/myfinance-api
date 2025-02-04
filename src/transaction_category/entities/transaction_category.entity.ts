import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '@/auth/entities/user.entity';


@Entity('transaction_categories')
export class TransactionCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ['income', 'expense', 'transfer'] })
  type: 'income' | 'expense' | 'transfer';

  @CreateDateColumn()
  createdAt: Date;
}
