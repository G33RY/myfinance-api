
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CarEvent } from '../entity/car_event.entity';


@Injectable()
export class CarEventRepository extends Repository<CarEvent> {
  constructor(private dataSource: DataSource)  {
    super(CarEvent, dataSource.createEntityManager())
  }
}
