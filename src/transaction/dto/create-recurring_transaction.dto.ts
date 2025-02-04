import { ApiProperty } from '@nestjs/swagger';
import { getEnumTypes } from '@/static_utils';
import { Transaction } from '@/transaction/entities/transaction.entity';
import { RecurringTransaction } from '@/transaction/entities/recurring_transaction.entity';
import { TransactionCategory } from '@/transaction_category/entities/transaction_category.entity';
import { CreateTransactionDto } from '@/transaction/dto/create-transaction.dto';

export class CreateRecurringTransactionDto extends CreateTransactionDto {

  @ApiProperty({ enum: getEnumTypes(RecurringTransaction, 'recurrenceType') })
  recurrenceType: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';

  intervalCount?: number;
  dayOfPayment?: number;
  specificWeekday?: string;
  autoAdd: boolean;
  endDate?: Date;

}
