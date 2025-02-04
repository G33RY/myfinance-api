import { Injectable } from '@nestjs/common';
import { CreateTransactionCategoryDto } from './dto/create-transaction_category.dto';
import { UpdateTransactionCategoryDto } from './dto/update-transaction_category.dto';
import { TransactionCategoryRepository } from '@/transaction_category/repositories/transaction_category.repository';
import { currentUserOrFail } from '@/static_utils';

@Injectable()
export class TransactionCategoryService {

  constructor(
    private readonly transactionCategoryRepository: TransactionCategoryRepository,
  ) {
  }

  create(createTransactionCategoryDto: CreateTransactionCategoryDto) {
    return this.transactionCategoryRepository.save({
      ...createTransactionCategoryDto,
      user: currentUserOrFail()
    })
  }

  findAll() {
    return this.transactionCategoryRepository.find({
      where: {
        user: currentUserOrFail()
      }
    });
  }

  findOne(id: number) {
    return this.transactionCategoryRepository.findOneOrFail({
      where: {
        id,
        user: currentUserOrFail()
      }
    })
  }

  async update(id: number, dto: UpdateTransactionCategoryDto) {
    const category = await this.findOne(id);
    return this.transactionCategoryRepository.save({
      ...category,
      ...dto
    })
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    return this.transactionCategoryRepository.remove(category);
  }
}
