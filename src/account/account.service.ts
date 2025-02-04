import { BadRequestException, Global, Injectable } from '@nestjs/common';
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
      throw new BadRequestException('Currency not found');
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
    return this.accountRepository.findOneOrFail({
      where: {
        id: id,
        user: {
          id: currentUserOrFail().id
        }
      },
      relations: ['currency']
    });
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const account = await this.findOne(id);
    const currency = updateAccountDto.currencyCode ? await this.currencyService.findOne(updateAccountDto.currencyCode) : null;
    if (updateAccountDto.currencyCode && !currency) {
      throw new BadRequestException('Currency not found');
    }

    return this.accountRepository.save({
      ...account,
      ...updateAccountDto
    });
  }

  async remove(id: number) {
    const account = await this.findOne(id);
    return this.accountRepository.remove(account);
  }
}
