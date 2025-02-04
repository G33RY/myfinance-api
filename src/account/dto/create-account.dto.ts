import { Account } from '@/account/entities/account.entity';
import { ApiProperty } from '@nestjs/swagger';
import { getColumnMetadata, getEnumTypes } from '@/static_utils';


export class CreateAccountDto {
  name: string;

  @ApiProperty({ enum: getEnumTypes(Account, 'type') })
  type: Account['type'];
  currencyCode: string;
}