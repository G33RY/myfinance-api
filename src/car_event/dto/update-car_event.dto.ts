import { PartialType } from '@nestjs/swagger';
import { CreateCarEventDto } from './create-car_event.dto';

export class UpdateCarEventDto extends PartialType(CreateCarEventDto) {}
