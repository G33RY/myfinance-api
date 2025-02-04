import { Module } from '@nestjs/common';
import { CarEventService } from './car_event.service';
import { CarEventController } from './car_event.controller';
import { CarEventRepository } from '@/car_event/repositories/car_event.repository';

@Module({
  controllers: [CarEventController],
  providers: [CarEventService, CarEventRepository],
  exports: [CarEventService, CarEventRepository],
})
export class CarEventModule {}
