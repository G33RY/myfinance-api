import { Global, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountRepository } from '@/account/repositories/account.repository';
import { AuthService } from '@/auth/auth.service';
import { RequestContext } from '@/context/context.model';
import { currentUserOrFail } from '@/static_utils';
import { CurrencyRepository } from '@/currency/repositories/currency.repository';
import { CurrencyService } from '@/currency/currency.service';


@Injectable()
export class AccountService {

  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly currencyService: CurrencyService
  ) {
  }

  async create(createAccountDto: CreateAccountDto) {
    const currency = await this.currencyService.findOne(createAccountDto.currencyCode);
    if (!currency) {
      throw new Error('Currency not found');
    }


    return this.accountRepository.save({
      ...createAccountDto,
      user: currentUserOrFail(),
      currency: currency
    });
  }

  findAll() {
    return this.accountRepository.find({
      where: { user: {
        id: currentUserOrFail().id
      }
      },
      relations: ['currency']
    });
  }

  findOne(id: number) {
    return this.accountRepository.findOne({
      where: {
        id: id,
        user: {
          id: currentUserOrFail().id
        }
      }
    });
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return this.accountRepository.update({
      id: id,
      user: {
        id: currentUserOrFail().id
      }
    }, updateAccountDto);
  }

  remove(id: number) {
    return this.accountRepository.delete({
      id: id,
      user: {
        id: currentUserOrFail().id
      }
    });
  }
}
