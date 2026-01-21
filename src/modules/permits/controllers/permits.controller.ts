import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermitsService } from '../services/permits.service';
import { CreatePermitDto } from '../dto/create-permit.dto';
import { UpdatePermitDto } from '../dto/update-permit.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Permits')
@Controller('permits')
export class PermitsController {
  constructor(private readonly permitsService: PermitsService) {}

  @Post()
  @ApiOperation({ summary: 'Buat izin baru' })
  @ApiResponse({ status: 201, description: 'Izin berhasil dibuat.' })
  @ApiResponse({ status: 400, description: 'Input tidak valid.' })
  create(@Body() createPermitDto: CreatePermitDto) {
    return this.permitsService.create(createPermitDto);
  }

  @Get()
  @ApiOperation({ summary: 'Dapatkan semua izin' })
  @ApiResponse({
    status: 200,
    description: 'Berhasil mendapatkan semua izin.',
  })
  @ApiResponse({ status: 500, description: 'Terjadi kesalahan pada server.' })
  findAll() {
    return this.permitsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Dapatkan izin berdasarkan ID' })
  @ApiResponse({ status: 200, description: 'Berhasil mendapatkan izin.' })
  @ApiResponse({ status: 404, description: 'Izin tidak ditemukan.' })
  findOne(@Param('id') id: string) {
    return this.permitsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Perbarui izin berdasarkan ID' })
  @ApiResponse({ status: 200, description: 'Berhasil memperbarui izin.' })
  @ApiResponse({ status: 404, description: 'Izin tidak ditemukan.' })
  update(@Param('id') id: string, @Body() updatePermitDto: UpdatePermitDto) {
    return this.permitsService.update(id, updatePermitDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hapus izin berdasarkan ID' })
  @ApiResponse({ status: 200, description: 'Berhasil menghapus izin.' })
  @ApiResponse({ status: 404, description: 'Izin tidak ditemukan.' })
  remove(@Param('id') id: string) {
    return this.permitsService.remove(id);
  }
}
