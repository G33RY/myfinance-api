import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Car } from './car.entity';

@Entity('car_events')
export class CarEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Car)
  car: Car;

  @Column({ type: 'enum', enum: ['odometer', 'fuel', 'maintenance', 'repair', 'accident', 'other'] })
  eventType: 'odometer' | 'fuel' | 'maintenance' | 'repair' | 'accident' | 'other';

  @Column({ nullable: true })
  description?: string; // General description of the event

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  amountSpent?: number; // Cost for maintenance, fuel, etc.

  @Column({ nullable: true })
  location?: string; // Gas station, mechanic, or accident location

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  mileage?: number; // Stores odometer readings (in km)

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  fuelAmount?: number; // Liters of fuel or kWh of charge

  @Column({ nullable: true })
  serviceProvider?: string; // Mechanic, insurance, or shop name

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  insuranceCovered?: number; // Insurance claim amount

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  outOfPocketCost?: number; // Cost paid by the user

  @Column({ default: false })
  insuranceClaimed: boolean; // Was insurance claimed?

  @CreateDateColumn()
  createdAt: Date;
}
