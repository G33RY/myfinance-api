import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Currency } from '@/currency/entities/currency.entity';
import { User } from '@/auth/entities/user.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ['cash', 'card', 'investment', 'other'] })
  type: 'cash' | 'card' | 'investment' | 'other';

  @ManyToOne(() => Currency)
  currency: Currency;

  @CreateDateColumn()
  createdAt: Date;
}
