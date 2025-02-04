import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

import { currentUserOrFail } from '@/static_utils';
import { CarRepository } from '@/car/repositories/car.repository';

@Injectable()
export class CarService {
  constructor(
    private readonly carRepository: CarRepository,
  ) {}


  create(dto: CreateCarDto) {
    return this.carRepository.save({
      ...dto,
      user: currentUserOrFail()
    })
  }

  findAll() {
    return this.carRepository.find({
      where: {
        user: currentUserOrFail()
      }
    });
  }

  findOne(id: number) {
    return this.carRepository.findOneOrFail({
      where: {
        id,
        user: currentUserOrFail()
      }
    })
  }

  async update(id: number, dto: UpdateCarDto) {
    const car = await this.findOne(id);
    return this.carRepository.save({
      ...car,
      ...dto
    })
  }

  async remove(id: number) {
    const car = await this.findOne(id);
    return this.carRepository.remove(car);
  }
}
