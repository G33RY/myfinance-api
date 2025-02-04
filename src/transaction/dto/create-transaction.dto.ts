import { ApiProperty } from '@nestjs/swagger';
import { getEnumTypes } from '@/static_utils';
import { Transaction } from '@/transaction/entities/transaction.entity';

export class CreateTransactionDto {
  amount: number;
  date: Date;

  @ApiProperty({ enum: getEnumTypes(Transaction, 'type') })
  type: 'cash' | 'card';

  @ApiProperty({ enum: getEnumTypes(Transaction, 'transactionType') })
  transactionType: 'income' | 'expense' | 'transfer';

  categoryId: number;
  currencyCode: string;
  relatedAccountId?: number;
  recipientAccountId?: number;
  tags?: string[];
}
