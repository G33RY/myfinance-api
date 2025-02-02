import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Account } from '../entity/account.entity';


@Injectable()
export class AccountRepository extends Repository<Account> {
  constructor(private dataSource: DataSource)  {
    super(Account, dataSource.createEntityManager())
  }
}