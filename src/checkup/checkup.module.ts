import { Module } from '@nestjs/common';
import { CheckupService } from './checkup.service';
import { CheckupController } from './checkup.controller';
import { CheckupHistoryRepository } from '@/checkup/repositories/checkup_history.repository';

@Module({
  controllers: [CheckupController],
  providers: [CheckupService, CheckupHistoryRepository],
  exports: [CheckupService, CheckupHistoryRepository]
})
export class CheckupModule {}
