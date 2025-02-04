import { Injectable } from '@nestjs/common';
import { CreateCarEventDto } from './dto/create-car_event.dto';
import { UpdateCarEventDto } from './dto/update-car_event.dto';
import { CreateCarReminderDto } from '@/car_reminder/dto/create-car_reminder.dto';
import { UpdateCarReminderDto } from '@/car_reminder/dto/update-car_reminder.dto';
import { CarReminderRepository } from '@/car_reminder/repositories/car_reminder.repository';
import { CarEventRepository } from '@/car_event/repositories/car_event.repository';

@Injectable()
export class CarEventService {
  constructor(
    private readonly repository: CarEventRepository,
  ) {}

  create(carId: number, dto: CreateCarEventDto) {
    return this.repository.save({
      ...dto,
      car: { id: carId },
    })
  }

  findAll(carId: number) {
    return this.repository.find({
      where: {
        car: { id: carId }
      }
    });
  }

  findOne(carId: number, id: number) {
    return this.repository.findOneOrFail({
      where: {
        id,
        car: { id: carId }
      }
    })
  }

  async update(carId: number, id: number, dto: UpdateCarEventDto) {
    const category = await this.findOne(carId, id);
    return this.repository.save({
      ...category,
      ...dto
    })
  }

  async remove(carId: number, id: number) {
    const category = await this.findOne(carId, id);
    return this.repository.remove(category);
  }
}
