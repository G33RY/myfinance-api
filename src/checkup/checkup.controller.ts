import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CheckupService } from './checkup.service';
import { CreateCheckupDto } from './dto/create-checkup.dto';
import { UpdateCheckupDto } from './dto/update-checkup.dto';

@Controller('checkup')
export class CheckupController {
  constructor(private readonly checkupService: CheckupService) {}

  @Post()
  create(@Body() createCheckupDto: CreateCheckupDto) {
    return this.checkupService.create(createCheckupDto);
  }

  @Get()
  findAll() {
    return this.checkupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckupDto: UpdateCheckupDto) {
    return this.checkupService.update(+id, updateCheckupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkupService.remove(+id);
  }
}
