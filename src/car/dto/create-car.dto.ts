import { ApiProperty } from '@nestjs/swagger';
import { getEnumTypes } from '@/static_utils';
import { Car } from '@/car/entities/car.entity';

export class CreateCarDto {
  name: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  licensePlate: string;
  vin: string;
  purchasePrice?: number;

  @ApiProperty({ enum: getEnumTypes(Car,'fuelType') })
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
}
