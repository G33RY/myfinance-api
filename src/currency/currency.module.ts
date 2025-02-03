import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';

@Module({
  controllers: [CurrencyController],
  providers: [CurrencyService, CurrencyController],
  exports: [CurrencyService, CurrencyController],
})
export class CurrencyModule {}
