import { ApiProperty } from '@nestjs/swagger';

export class CreateCurrencyDto {
  @ApiProperty({
    maxLength: 3,
    minLength: 3,
  })
  code: string
  name: string
  symbol: string
  exchangeRate: number
}
