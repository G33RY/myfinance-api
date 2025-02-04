import { PartialType } from '@nestjs/swagger';
import { CreateTransactionCategoryDto } from '@/transaction_category/dto/create-transaction_category.dto';

export class UpdateTransactionCategoryDto extends PartialType(CreateTransactionCategoryDto) {}
