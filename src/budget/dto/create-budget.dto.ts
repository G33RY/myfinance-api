import { Budget } from '@/budget/entities/budget.entity';
import { ApiProperty } from '@nestjs/swagger';
import { getColumnMetadata, getEnumTypes } from '@/static_utils';

export class CreateBudgetDto {
  currencyCode: string;
  categoryId: number;
  amount: number;

  @ApiProperty({ enum: getEnumTypes(Budget, 'periodType') })
  periodType: Budget['periodType'];
}
