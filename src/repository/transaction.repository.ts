
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Transaction } from '../entity/transaction.entity';


@Injectable()
export class TransactionRepository extends Repository<Transaction> {
  constructor(private dataSource: DataSource)  {
    super(Transaction, dataSource.createEntityManager())
  }
}
