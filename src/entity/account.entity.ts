import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Currency } from './currency.entity';

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
