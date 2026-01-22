import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TrailsService } from './trails.service';
import { CreateTrailDto } from './dto/create-trail.dto';
import { UpdateTrailDto } from './dto/update-trail.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Trails')
@Controller('trails')
export class TrailsController {
  constructor(private readonly trailsService: TrailsService) {}

  @Post()
  @ApiOperation({ summary: 'Buat jalur baru' })
  @ApiResponse({ status: 201, description: 'Jalur berhasil dibuat.' })
  @ApiResponse({ status: 400, description: 'Input tidak valid.' })
  create(@Body() createTrailDto: CreateTrailDto) {
    return this.trailsService.create(createTrailDto);
  }

  @Get()
  @ApiOperation({ summary: 'Dapatkan semua jalur' })
  @ApiResponse({
    status: 200,
    description: 'Berhasil mendapatkan semua jalur.',
  })
  @ApiResponse({ status: 500, description: 'Terjadi kesalahan pada server.' })
  findAll() {
    return this.trailsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Dapatkan jalur berdasarkan ID' })
  @ApiResponse({ status: 200, description: 'Berhasil mendapatkan jalur.' })
  @ApiResponse({ status: 404, description: 'Jalur tidak ditemukan.' })
  findOne(@Param('id') id: string) {
    return this.trailsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Perbarui jalur berdasarkan ID' })
  @ApiResponse({ status: 200, description: 'Berhasil memperbarui jalur.' })
  @ApiResponse({ status: 404, description: 'Jalur tidak ditemukan.' })
  update(@Param('id') id: string, @Body() updateTrailDto: UpdateTrailDto) {
    return this.trailsService.update(id, updateTrailDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hapus jalur berdasarkan ID' })
  @ApiResponse({ status: 200, description: 'Berhasil menghapus jalur.' })
  @ApiResponse({ status: 404, description: 'Jalur tidak ditemukan.' })
  remove(@Param('id') id: string) {
    return this.trailsService.remove(id);
  }
}
