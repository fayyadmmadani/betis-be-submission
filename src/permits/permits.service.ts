import { Injectable } from '@nestjs/common';
import { CreatePermitDto } from './dto/create-permit.dto';
import { UpdatePermitDto } from './dto/update-permit.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermitsService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  async create(createPermitDto: CreatePermitDto) {
    return this.prisma.permit.create({
      data: {
        hikerId: createPermitDto.hikerId,
        trailId: createPermitDto.trailId,
        date: new Date(createPermitDto.date),
      },
      // Saat berhasil dibuat, tolong tampilkan detail nama pendaki & jalurnya juga
      include: {
        hiker: true,
        trail: true,
      },
    });
  }

  // FIND ALL (Dengan Detail)
  async findAll() {
    return this.prisma.permit.findMany({
      include: {
        // <--- Fitur JOIN
        hiker: true,
        trail: true,
      },
    });
  }

  // FIND ONE
  async findOne(id: string) {
    return this.prisma.permit.findUnique({
      where: { id },
      include: {
        hiker: true,
        trail: true,
      },
    });
  }

  // UPDATE
  async update(id: string, updatePermitDto: UpdatePermitDto) {
    return this.prisma.permit.update({
      where: { id },
      data: {
        ...updatePermitDto,
        date: updatePermitDto.date ? new Date(updatePermitDto.date) : undefined,
      },
    });
  }

  // REMOVE
  async remove(id: string) {
    return this.prisma.permit.delete({
      where: { id },
    });
  }
}
