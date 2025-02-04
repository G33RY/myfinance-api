import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionCategoryService } from './transaction_category.service';
import { CreateTransactionCategoryDto } from './dto/create-transaction_category.dto';
import { UpdateTransactionCategoryDto } from './dto/update-transaction_category.dto';

@Controller('transaction-category')
export class TransactionCategoryController {
  constructor(private readonly transactionCategoryService: TransactionCategoryService) {}

  @Post()
  create(@Body() createTransactionCategoryDto: CreateTransactionCategoryDto) {
    return this.transactionCategoryService.create(createTransactionCategoryDto);
  }

  @Get()
  findAll() {
    return this.transactionCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionCategoryDto: UpdateTransactionCategoryDto) {
    return this.transactionCategoryService.update(+id, updateTransactionCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionCategoryService.remove(+id);
  }
}
