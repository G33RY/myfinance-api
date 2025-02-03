
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TransactionCategory } from '../entities/transaction_category.entity';


@Injectable()
export class TransactionCategoryRepository extends Repository<TransactionCategory> {
  constructor(private dataSource: DataSource)  {
    super(TransactionCategory, dataSource.createEntityManager())
  }
}
