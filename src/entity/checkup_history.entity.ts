import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { Account } from './account.entity';
import { Transaction } from './transaction.entity';

@Entity('checkup_histories')
export class CheckupHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Account)
  account: Account;

  @ManyToOne(() => Transaction)
  transaction: Transaction;

  @Column()
  checkupDate: Date; // When the checkup was performed

  @Column('decimal', { precision: 10, scale: 2 })
  actualBalance: number; // User’s real balance

  @Column('decimal', { precision: 10, scale: 2 })
  expectedBalance: number; // Calculated expected balance

  @Column('decimal', { precision: 10, scale: 2 })
  discrepancy: number; // Difference (auto-calculated: actual - expected)

  @Column({ nullable: true })
  notes?: string; // Optional reason for discrepancy

  @CreateDateColumn()
  createdAt: Date;
}
