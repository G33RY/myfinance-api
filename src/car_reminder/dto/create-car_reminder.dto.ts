import { ApiProperty } from '@nestjs/swagger';
import { getEnumTypes } from '@/static_utils';
import { CarReminder } from '@/car_reminder/entities/car_reminder.entity';

export class CreateCarReminderDto {

  task: string;
  @ApiProperty({ enum: getEnumTypes(CarReminder,'reminderType') })
  reminderType: 'mileage' | 'date';
  mileage?: number;
  period?: number;

  @ApiProperty({ enum: getEnumTypes(CarReminder,'periodType') })
  periodType: 'days' | 'weeks' | 'months' | 'years';
  lastDoneMileage?: number;
  lastDoneDate?: Date;
}
