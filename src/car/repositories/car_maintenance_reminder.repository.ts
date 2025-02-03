
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CarMaintenanceReminder } from '../entities/car_maintenance_reminder';


@Injectable()
export class CarMaintenanceReminderRepository extends Repository<CarMaintenanceReminder> {
  constructor(private dataSource: DataSource)  {
    super(CarMaintenanceReminder, dataSource.createEntityManager())
  }
}
