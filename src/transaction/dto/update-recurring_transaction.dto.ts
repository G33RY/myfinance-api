import { PartialType } from '@nestjs/swagger';
import { CreateRecurringTransactionDto } from '@/transaction/dto/create-recurring_transaction.dto';

export class UpdateRecurringTransactionDto extends PartialType(CreateRecurringTransactionDto) {}
