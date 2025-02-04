
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CarReminder } from '@/car_reminder/entities/car_reminder.entity';



@Injectable()
export class CarReminderRepository extends Repository<CarReminder> {
  constructor(private dataSource: DataSource)  {
    super(CarReminder, dataSource.createEntityManager())
  }
}
