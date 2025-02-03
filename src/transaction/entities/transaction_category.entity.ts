import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '@/auth/entities/user.entity';


@Entity('transaction_categories')
export class TransactionCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User; // Each user can have their own categories

  @Column()
  name: string; // Example: "Food", "Rent", "Fuel"

  @Column({ type: 'enum', enum: ['income', 'expense', 'transfer'] })
  type: 'income' | 'expense' | 'transfer'; // Defines if it's for income, expenses, or transfers

  @CreateDateColumn()
  createdAt: Date;
}
