import { Module } from '@nestjs/common';
import { CarReminderService } from './car_reminder.service';
import { CarReminderController } from './car_reminder.controller';
import { CarReminderRepository } from '@/car_reminder/repositories/car_reminder.repository';

@Module({
  controllers: [CarReminderController],
  providers: [CarReminderService, CarReminderRepository],
  exports: [CarReminderService, CarReminderRepository],
})
export class CarReminderModule {}
