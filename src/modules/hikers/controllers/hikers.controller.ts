import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HikersService } from '../services/hikers.service';
import { CreateHikerDto } from '../dto/create-hiker.dto';
import { UpdateHikerDto } from '../dto/update-hiker.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Hikers')
@Controller('hikers')
export class HikersController {
  constructor(private readonly hikersService: HikersService) {}

  @Post()
  @ApiOperation({ summary: 'Buat pendaki baru' })
  @ApiResponse({ status: 201, description: 'Pendaki berhasil dibuat.' })
  @ApiResponse({ status: 400, description: 'Input tidak valid.' })
  create(@Body() createHikerDto: CreateHikerDto) {
    return this.hikersService.create(createHikerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Dapatkan semua pendaki' })
  @ApiResponse({
    status: 200,
    description: 'Berhasil mendapatkan semua pendaki.',
  })
  @ApiResponse({ status: 500, description: 'Terjadi kesalahan pada server.' })
  findAll() {
    return this.hikersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Dapatkan pendaki berdasarkan ID' })
  @ApiResponse({ status: 200, description: 'Berhasil mendapatkan pendaki.' })
  @ApiResponse({ status: 404, description: 'Pendaki tidak ditemukan.' })
  findOne(@Param('id') id: string) {
    return this.hikersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Perbarui pendaki berdasarkan ID' })
  @ApiResponse({ status: 200, description: 'Berhasil memperbarui pendaki.' })
  @ApiResponse({ status: 404, description: 'Pendaki tidak ditemukan.' })
  update(@Param('id') id: string, @Body() updateHikerDto: UpdateHikerDto) {
    return this.hikersService.update(id, updateHikerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hapus pendaki berdasarkan ID' })
  @ApiResponse({ status: 200, description: 'Berhasil menghapus pendaki.' })
  @ApiResponse({ status: 404, description: 'Pendaki tidak ditemukan.' })
  remove(@Param('id') id: string) {
    return this.hikersService.remove(id);
  }
}
