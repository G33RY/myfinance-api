import { Injectable } from '@nestjs/common';
import { CreateCheckupDto } from './dto/create-checkup.dto';
import { currentUserOrFail } from '@/static_utils';
import { UpdateCheckupDto } from '@/checkup/dto/update-checkup.dto';
import { CheckupHistoryRepository } from '@/checkup/repositories/checkup_history.repository';

@Injectable()
export class CheckupService {
  constructor(
    private readonly repository: CheckupHistoryRepository,
  ) {}


  create(dto: CreateCheckupDto) {
    return this.repository.save({
      ...dto,
      user: currentUserOrFail(),
      accountId: {
        id: dto.accountId
      },
      discrepancyTransaction: {
        // This is a placeholder for the discrepancy transaction
      }
    })
  }

  findAll() {
    return this.repository.find({
      where: {
        user: currentUserOrFail()
      }
    });
  }

  findOne(id: number) {
    return this.repository.findOneOrFail({
      where: {
        id,
        user: currentUserOrFail()
      }
    })
  }

  async update(id: number, dto: UpdateCheckupDto) {
    const car = await this.findOne(id);
    return this.repository.save({
      ...car,
      ...dto
    })
  }

  async remove(id: number) {
    const car = await this.findOne(id);
    return this.repository.remove(car);
  }
}
