import { Body, Delete, Get, Injectable, Param, Patch, Post } from '@nestjs/common';
import { TransactionCategoryService } from '@/transaction_category/transaction_category.service';
import { RecurringTransactionRepository } from '@/transaction/repositories/recurring_transaction.repository';
import { CreateRecurringTransactionDto } from '@/transaction/dto/create-recurring_transaction.dto';
import { UpdateRecurringTransactionDto } from '@/transaction/dto/update-recurring_transaction.dto';
import { AccountService } from '@/account/account.service';
import { CurrencyService } from '@/currency/currency.service';
import { currentUserOrFail } from '@/static_utils';

@Injectable()
export class RecurringTransactionService {
  constructor(
    private readonly recurringTransactionRepository: RecurringTransactionRepository,
    private readonly accountService: AccountService,
    private readonly currencyService: CurrencyService,
    private readonly transactionCategoryService: TransactionCategoryService,
  ) {}

  async create(dto: CreateRecurringTransactionDto) {
    const relatedAccount = dto.relatedAccountId ? await this.accountService.findOne(dto.relatedAccountId) : null
    const recipientAccount = dto.recipientAccountId ? await this.accountService.findOne(dto.recipientAccountId) : null
    const currency = await this.currencyService.findOne(dto.currencyCode)
    const transactionCategory = await this.transactionCategoryService.findOne(dto.categoryId)

    return this.recurringTransactionRepository.save({
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
    return this.recurringTransactionRepository.find({
      where: {
        user: {
          id: currentUserOrFail().id,
        }
      },
      relations: ['relatedAccount', 'recipientAccount', 'transactionCategory', 'currency'],
    })
  }

  findOne(id: number) {
    return this.recurringTransactionRepository.findOneOrFail({
      where: {
        id,
        user: {
          id: currentUserOrFail().id,
        }
      },
      relations: ['relatedAccount', 'recipientAccount', 'transactionCategory', 'currency'],
    })
  }

  async update(id: number, dto: UpdateRecurringTransactionDto) {
    const trans = this.findOne(id);
    const relatedAccount = dto.relatedAccountId ? await this.accountService.findOne(dto.relatedAccountId) : null
    const recipientAccount = dto.recipientAccountId ? await this.accountService.findOne(dto.recipientAccountId) : null
    const currency = dto.currencyCode ?  await this.currencyService.findOne(dto.currencyCode) : null
    const transactionCategory = dto.categoryId ? await this.transactionCategoryService.findOne(dto.categoryId) : null

    return this.recurringTransactionRepository.save({
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
    return this.recurringTransactionRepository.remove(trans)
  }
}
