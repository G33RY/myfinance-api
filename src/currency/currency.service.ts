import { Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Currency } from '@/currency/entities/currency.entity';
import { CurrencyRepository } from '@/currency/repositories/currency.repository';

@Injectable()
export class CurrencyService {
  constructor(
    private currencyRepository: CurrencyRepository
  ) {
  }

  create(createCurrencyDto: CreateCurrencyDto) {
    return this.currencyRepository.save({
      ...createCurrencyDto
    })
  }

  findAll() {
    return this.currencyRepository.find()
  }

  findOne(code: string) {
    return this.currencyRepository.findOne({
      where: {
        code
      }
    })
  }

  update(code: string, updateCurrencyDto: UpdateCurrencyDto) {
    return this.currencyRepository.update({ code }, {
      ...updateCurrencyDto
    })
  }

  remove(code: string) {
    return this.currencyRepository.delete({
        code
    })
  }
}
