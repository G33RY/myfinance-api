import { DataSource, EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Injectable } from '@nestjs/common';
import { Account } from '../entity/account.entity';
import { Budget } from '../entity/budget.entity';


@Injectable()
export class BudgetRepository extends Repository<Budget> {
  constructor(private dataSource: DataSource)  {
    super(Budget, dataSource.createEntityManager())
  }
}