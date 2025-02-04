import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarEventService } from './car_event.service';
import { CreateCarEventDto } from './dto/create-car_event.dto';
import { UpdateCarEventDto } from './dto/update-car_event.dto';
import { CreateCarReminderDto } from '@/car_reminder/dto/create-car_reminder.dto';
import { UpdateCarReminderDto } from '@/car_reminder/dto/update-car_reminder.dto';

@Controller('car-event')
export class CarEventController {
  constructor(private readonly carEventService: CarEventService) {}

  @Post(":carId")
  create(@Body() dto: CreateCarEventDto, @Param('carId') carId: string) {
    return this.carEventService.create(+carId,dto);
  }

  @Get(":carId")
  findAll(@Param('carId') carId: string) {
    return this.carEventService.findAll(+carId);
  }

  @Get(':carId/:id')
  findOne(@Param('carId') carId: string, @Param('id') id: string) {
    return this.carEventService.findOne(+carId,+id);
  }

  @Patch(':carId/:id')
  update(@Param('carId') carId: string, @Param('id') id: string, @Body() dto: UpdateCarEventDto) {
    return this.carEventService.update(+carId,+id, dto);
  }

  @Delete(':carId/:id')
  remove(@Param('carId') carId: string, @Param('id') id: string) {
    return this.carEventService.remove(+carId, +id);
  }
}
