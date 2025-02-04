import { Account } from '@/account/entities/account.entity';
import { ApiProperty } from '@nestjs/swagger';
import { getColumnMetadata } from '@/static_utils';


export class CreateAccountDto {
  name: string;

  @ApiProperty({ enum: getColumnMetadata(Account, 'type')?.options.enum })
  type: Account['type'];
  currencyCode: string;
}