
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Currency } from '../entities/currency.entity';


@Injectable()
export class CurrencyRepository extends Repository<Currency> {
  constructor(private dataSource: DataSource)  {
    super(Currency, dataSource.createEntityManager())
  }
}
