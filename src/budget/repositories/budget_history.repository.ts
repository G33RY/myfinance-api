import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BudgetHistory } from '../entities/budget_history.entity';


@Injectable()
export class BudgetHistoryRepository extends Repository<BudgetHistory> {
  constructor(private dataSource: DataSource)  {
    super(BudgetHistory, dataSource.createEntityManager())
  }
}
