import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { CarMaintenanceReminderRepository } from '@/car/repositories/car_maintenance_reminder.repository';
import { CarRepository } from '@/car/repositories/car.repository';
import { CarEventRepository } from '@/car/repositories/car_event.repository';

@Module({
  controllers: [CarController],
  providers: [CarService, CarRepository, CarEventRepository, CarMaintenanceReminderRepository],
  exports: [CarService, CarRepository, CarEventRepository, CarMaintenanceReminderRepository],
})
export class CarModule {}
