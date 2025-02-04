import { Injectable } from '@nestjs/common';
import { CreateCarReminderDto } from './dto/create-car_reminder.dto';
import { UpdateCarReminderDto } from './dto/update-car_reminder.dto';
import { CarReminderRepository } from '@/car_reminder/repositories/car_reminder.repository';
import { CreateTransactionCategoryDto } from '@/transaction_category/dto/create-transaction_category.dto';
import { currentUserOrFail } from '@/static_utils';
import { UpdateTransactionCategoryDto } from '@/transaction_category/dto/update-transaction_category.dto';

@Injectable()
export class CarReminderService {

  constructor(
    private readonly carReminderRepository: CarReminderRepository,
  ) {
  }

  create(carId: number, createTransactionCategoryDto: CreateCarReminderDto) {
    return this.carReminderRepository.save({
      ...createTransactionCategoryDto,
      car: { id: carId },
    })
  }

  findAll(carId: number) {
    return this.carReminderRepository.find({
      where: {
        car: { id: carId }
      }
    });
  }

  findOne(carId: number, id: number) {
    return this.carReminderRepository.findOneOrFail({
      where: {
        id,
        car: { id: carId }
      }
    })
  }

  async update(carId: number, id: number, dto: UpdateCarReminderDto) {
    const category = await this.findOne(carId, id);
    return this.carReminderRepository.save({
      ...category,
      ...dto
    })
  }

  async remove(carId: number, id: number) {
    const category = await this.findOne(carId, id);
    return this.carReminderRepository.remove(category);
  }
}
