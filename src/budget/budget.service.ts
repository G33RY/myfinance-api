import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { CurrencyService } from '@/currency/currency.service';
import { BudgetRepository } from '@/budget/repositories/budget.repository';
import { BudgetHistoryRepository } from '@/budget/repositories/budget_history.repository';
import { currentUserOrFail } from '@/static_utils';
import { Budget } from '@/budget/entities/budget.entity';
import { TransactionCategoryRepository } from '@/transaction_category/repositories/transaction_category.repository';


@Injectable()
export class BudgetService {
  constructor(
    private readonly budgetRepository: BudgetRepository,
    private readonly budgetHistoryRepository: BudgetHistoryRepository,
    private readonly transactionCategoryRepository: TransactionCategoryRepository,
    private readonly currencyService: CurrencyService,
  ) {
  }

  async create(createBudgetDto: CreateBudgetDto) {
    const currency = await this.currencyService.findOne(createBudgetDto.currencyCode);
    if (!currency) {
      throw new BadRequestException('Currency not found');
    }

    const catExists = await this.transactionCategoryRepository.exists({
      where: {
        id: createBudgetDto.categoryId,
        user: currentUserOrFail(),
      },
    });
    if (!catExists) {
      throw new BadRequestException('Category not found');
    }

    return this.budgetRepository.save({
      ...createBudgetDto,
      currency: { code: createBudgetDto.currencyCode },
      category: { id: createBudgetDto.categoryId },
    });
  }

  findAll() {
    return this.budgetRepository.find({
      where: {
        user: currentUserOrFail(),
      },
      relations: ['currency', 'category'],
    });
  }

  findOne(id: number) {
    return this.budgetRepository.findOneOrFail({
      where: {
        id,
        user: currentUserOrFail(),
      },
      relations: ['currency', 'category'],
    });
  }

  async update(id: number, updateBudgetDto: UpdateBudgetDto) {
    const budget = await this.findOne(id);
    if(updateBudgetDto.categoryId) {
      const catExists = await this.transactionCategoryRepository.exists({
        where: {
          id: updateBudgetDto.categoryId,
          user: currentUserOrFail(),
        },
      });
      if (!catExists) {
        throw new BadRequestException('Category not found');
      }
    }
    if(updateBudgetDto.currencyCode) {
      const currency = await this.currencyService.findOne(updateBudgetDto.currencyCode);
      if (!currency) {
        throw new BadRequestException('Currency not found');
      }
    }
    return this.budgetRepository.save({
      ...budget,
      ...updateBudgetDto,
      currency: { code: updateBudgetDto.currencyCode },
      category: { id: updateBudgetDto.categoryId },
    });
  }

  async remove(id: number) {
    const budget = await this.findOne(id);
    return this.budgetRepository.softRemove(budget);

  }



}
