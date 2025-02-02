
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CheckupHistory } from '../entity/checkup_history.entity';


@Injectable()
export class CheckupHistoryRepository extends Repository<CheckupHistory> {
  constructor(private dataSource: DataSource)  {
    super(CheckupHistory, dataSource.createEntityManager())
  }
}
