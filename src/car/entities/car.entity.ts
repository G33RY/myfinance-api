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

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  purchasePrice?: number;

  @Column({ type: 'enum', enum: ['gasoline', 'diesel', 'electric', 'hybrid'] })
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';

  @Column({ nullable: true })
  maintenanceThreshold?: number;

  @CreateDateColumn()
  createdAt: Date;
}
