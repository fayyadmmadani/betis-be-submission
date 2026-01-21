import { Injectable, NotFoundException } from '@nestjs/common'; // <--- Tambah NotFoundException
import { CreateHikerDto } from './dto/create-hiker.dto';
import { UpdateHikerDto } from './dto/update-hiker.dto';
import { PrismaService } from '../../config/prisma/prisma.service';

@Injectable()
export class HikersService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  async create(createHikerDto: CreateHikerDto) {
    return this.prisma.hiker.create({
      data: createHikerDto,
    });
  }

  // FIND ALL
  async findAll() {
    return this.prisma.hiker.findMany();
  }

  // FIND ONE
  async findOne(id: string) {
    const hiker = await this.prisma.hiker.findUnique({
      where: { id },
    });

    // Error handling
    if (!hiker) {
      throw new NotFoundException(`Pendaki dengan ID ${id} tidak ditemukan`);
    }

    return hiker;
  }

  // UPDATE
  async update(id: string, updateHikerDto: UpdateHikerDto) {
    await this.findOne(id);

    return this.prisma.hiker.update({
      where: { id },
      data: updateHikerDto,
    });
  }

  // DELETE
  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.hiker.delete({
      where: { id },
    });
  }
}
