import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Car } from '@/car/entities/car.entity';

@Entity('car_reminders')
export class CarReminder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Car)
  car: Car;

  @Column()
  task: string; // Example: "Oil Change", "Brake Check"

  @Column({ type: 'enum', enum: ['mileage', 'date'] })
  reminderType: 'mileage' | 'date'; // Does it trigger by mileage or time?

  @Column({ nullable: true })
  mileage?: number; // Notify at every X miles

  @Column({ nullable: true })
  period?: number; // Notify every X days/weeks/months/years

  @Column({ type: 'enum', enum: ['days', 'weeks', 'months', 'years'], nullable: true })
  periodType: 'days' | 'weeks' | 'months' | 'years';

  @Column({ nullable: true })
  lastDoneMileage?: number; // Last time the maintenance was done

  @Column({ nullable: true })
  lastDoneDate?: Date; // Last time the maintenance was done

  @CreateDateColumn()
  createdAt: Date;
}
