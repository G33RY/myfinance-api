import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Car } from './car.entity';

@Entity('car_maintenance_reminders')
export class CarMaintenanceReminder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Car)
  car: Car;

  @Column()
  task: string; // Example: "Oil Change", "Brake Check"

  @Column({ type: 'enum', enum: ['mileage', 'date'] })
  reminderType: 'mileage' | 'date'; // Does it trigger by mileage or time?

  @Column({ nullable: true })
  targetMileage?: number; // Notify when car reaches this mileage

  @Column({ nullable: true })
  targetDate?: Date; // Notify on this date

  @Column({ default: false })
  completed: boolean; // Has the maintenance been done?

  @CreateDateColumn()
  createdAt: Date;
}
