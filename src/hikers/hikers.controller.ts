import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HikersService } from './hikers.service';
import { CreateHikerDto } from './dto/create-hiker.dto';
import { UpdateHikerDto } from './dto/update-hiker.dto';

@Controller('hikers')
export class HikersController {
  constructor(private readonly hikersService: HikersService) {}

  @Post()
  create(@Body() createHikerDto: CreateHikerDto) {
    return this.hikersService.create(createHikerDto);
  }

  @Get()
  findAll() {
    return this.hikersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hikersService.findOne(id); // Tidak ada +
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHikerDto: UpdateHikerDto) {
    return this.hikersService.update(id, updateHikerDto); // Tidak ada +
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hikersService.remove(id); // Tidak ada +
  }
}
