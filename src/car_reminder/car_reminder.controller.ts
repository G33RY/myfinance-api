import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarReminderService } from './car_reminder.service';
import { CreateCarReminderDto } from './dto/create-car_reminder.dto';
import { UpdateCarReminderDto } from './dto/update-car_reminder.dto';

@Controller('car-reminder')
export class CarReminderController {
  constructor(private readonly carReminderService: CarReminderService) {}

  @Post(":carId")
  create(@Body() createCarReminderDto: CreateCarReminderDto, @Param('carId') carId: string) {
    return this.carReminderService.create(+carId,createCarReminderDto);
  }

  @Get(":carId")
  findAll(@Param('carId') carId: string) {
    return this.carReminderService.findAll(+carId);
  }

  @Get(':carId/:id')
  findOne(@Param('carId') carId: string, @Param('id') id: string) {
    return this.carReminderService.findOne(+carId,+id);
  }

  @Patch(':carId/:id')
  update(@Param('carId') carId: string, @Param('id') id: string, @Body() updateCarReminderDto: UpdateCarReminderDto) {
    return this.carReminderService.update(+carId,+id, updateCarReminderDto);
  }

  @Delete(':carId/:id')
  remove(@Param('carId') carId: string, @Param('id') id: string) {
    return this.carReminderService.remove(+carId, +id);
  }
}
