import { ApiProperty } from '@nestjs/swagger';
import { getEnumTypes } from '@/static_utils';
import { TransactionCategory } from '@/transaction_category/entities/transaction_category.entity';

export class CreateTransactionCategoryDto {

  name: string;

  @ApiProperty({ enum: getEnumTypes(TransactionCategory, 'type') })
  type: 'income' | 'expense' | 'transfer';

}
