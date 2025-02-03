
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RecurringTransaction } from '../entities/recurring_transaction.entity';


@Injectable()
export class RecurringTransactionRepository extends Repository<RecurringTransaction> {
  constructor(private dataSource: DataSource)  {
    super(RecurringTransaction, dataSource.createEntityManager())
  }
}
