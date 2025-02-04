import { PartialType } from '@nestjs/swagger';
import { CreateCarReminderDto } from './create-car_reminder.dto';

export class UpdateCarReminderDto extends PartialType(CreateCarReminderDto) {}
