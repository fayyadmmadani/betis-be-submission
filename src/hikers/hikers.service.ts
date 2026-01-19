import { Injectable } from '@nestjs/common';
import { CreateHikerDto } from './dto/create-hiker.dto';
import { UpdateHikerDto } from './dto/update-hiker.dto';
import { PrismaService } from 'src/prisma/prisma.service'; // Import Prisma

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

  // FIND ONE (ID string)
  async findOne(id: string) {
    return this.prisma.hiker.findUnique({
      where: { id },
    });
  }

  // UPDATE (ID string)
  async update(id: string, updateHikerDto: UpdateHikerDto) {
    return this.prisma.hiker.update({
      where: { id },
      data: updateHikerDto,
    });
  }

  // REMOVE (ID string)
  async remove(id: string) {
    return this.prisma.hiker.delete({
      where: { id },
    });
  }
}
