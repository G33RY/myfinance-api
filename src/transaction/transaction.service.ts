import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AccountService } from '@/account/account.service';
import { CurrencyService } from '@/currency/currency.service';
import { TransactionCategoryService } from '@/transaction_category/transaction_category.service';
import { currentUserOrFail } from '@/static_utils';
import { UpdateTransactionDto } from '@/transaction/dto/update-transaction.dto';
import { TransactionRepository } from '@/transaction/repositories/transaction.repository';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly accountService: AccountService,
    private readonly currencyService: CurrencyService,
    private readonly transactionCategoryService: TransactionCategoryService,
  ) {}

  async create(dto: CreateTransactionDto) {
    const relatedAccount = dto.relatedAccountId ? await this.accountService.findOne(dto.relatedAccountId) : null
    const recipientAccount = dto.recipientAccountId ? await this.accountService.findOne(dto.recipientAccountId) : null
    const currency = await this.currencyService.findOne(dto.currencyCode)
    const transactionCategory = await this.transactionCategoryService.findOne(dto.categoryId)

    return this.transactionRepository.save({
      ...dto,
      relatedAccount: {
        id: relatedAccount?.id,
      },
      recipientAccount: {
        id: recipientAccount?.id,
      },
      transactionCategory: {
        id: transactionCategory.id,
      },
      currency: {
        code: currency.code,
      },
      user: {
        id: currentUserOrFail().id,
      }
    })
  }

  findAll() {
    return this.transactionRepository.find({
      where: {
        user: {
          id: currentUserOrFail().id,
        }
      },
      relations: ['relatedAccount', 'recipientAccount', 'transactionCategory', 'currency'],
    })
  }

  findOne(id: number) {
    return this.transactionRepository.findOneOrFail({
      where: {
        id,
        user: {
          id: currentUserOrFail().id,
        }
      },
      relations: ['relatedAccount', 'recipientAccount', 'transactionCategory', 'currency'],
    })
  }

  async update(id: number, dto: UpdateTransactionDto) {
    const trans = this.findOne(id);
    const relatedAccount = dto.relatedAccountId ? await this.accountService.findOne(dto.relatedAccountId) : null
    const recipientAccount = dto.recipientAccountId ? await this.accountService.findOne(dto.recipientAccountId) : null
    const currency = dto.currencyCode ?  await this.currencyService.findOne(dto.currencyCode) : null
    const transactionCategory = dto.categoryId ? await this.transactionCategoryService.findOne(dto.categoryId) : null

    return this.transactionRepository.save({
      ...trans,
      ...dto,
      relatedAccount: {
        id: relatedAccount?.id,
      },
      recipientAccount: {
        id: recipientAccount?.id,
      },
      transactionCategory: {
        id: transactionCategory?.id,
      },
      currency: {
        code: currency?.code,
      },
    });
  }

  async remove(id: number) {
    const trans = await this.findOne(id);
    return this.transactionRepository.remove(trans)
  }
}
