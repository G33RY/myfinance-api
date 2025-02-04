import { CarEvent } from '@/car_event/entities/car_event.entity';
import { getEnumTypes } from '@/static_utils';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarEventDto {

  @ApiProperty({ enum: getEnumTypes(CarEvent,'eventType') })
  eventType: 'odometer' | 'fuel' | 'maintenance' | 'repair' | 'accident' | 'other';
  description?: string;
  amountSpent?: number;
  location?: string;
  mileage?: number;
  fuelAmount?: number;
  serviceProvider?: string;
  insuranceCovered?: number;
  outOfPocketCost?: number;
  insuranceClaimed: boolean;
}
