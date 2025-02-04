import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RecurringTransactionService } from '@/transaction/recurring_transaction.service';
import { CreateTransactionCategoryDto } from '@/transaction_category/dto/create-transaction_category.dto';
import { UpdateTransactionCategoryDto } from '@/transaction_category/dto/update-transaction_category.dto';
import { CreateRecurringTransactionDto } from '@/transaction/dto/create-recurring_transaction.dto';
import { UpdateRecurringTransactionDto } from '@/transaction/dto/update-recurring_transaction.dto';

@Controller('recurring-transaction')
export class RecurringTransactionController {
  constructor(
    private readonly recurringTransactionService: RecurringTransactionService,
  ) {}

  @Post()
  create(@Body() dto: CreateRecurringTransactionDto) {
    return this.recurringTransactionService.create(dto);
  }

  @Get()
  findAll() {
    return this.recurringTransactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recurringTransactionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRecurringTransactionDto) {
    return this.recurringTransactionService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recurringTransactionService.remove(+id);
  }



}
