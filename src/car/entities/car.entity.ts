import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '@/auth/entities/user.entity';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @Column()
  licensePlate: string;

  @Column()
  vin: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  purchasePrice?: number;

  @Column({ type: 'enum', enum: ['gasoline', 'diesel', 'electric', 'hybrid'] })
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';

  @CreateDateColumn()
  createdAt: Date;
}
