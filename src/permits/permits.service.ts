import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermitDto } from './dto/create-permit.dto';
import { UpdatePermitDto } from './dto/update-permit.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PermitsService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  async create(createPermitDto: CreatePermitDto) {
    // Cek Pendaki
    const hiker = await this.prisma.hiker.findUnique({
      where: { id: createPermitDto.hikerId },
    });
    // Error handling
    if (!hiker) {
      throw new NotFoundException(
        `Pendaki dengan ID ${createPermitDto.hikerId} tidak ditemukan`,
      );
    }

    // Cek Jalur
    const trail = await this.prisma.trail.findUnique({
      where: { id: createPermitDto.trailId },
    });
    // Error handling
    if (!trail) {
      throw new NotFoundException(
        `Jalur dengan ID ${createPermitDto.trailId} tidak ditemukan`,
      );
    }

    return this.prisma.permit.create({
      data: {
        hikerId: createPermitDto.hikerId,
        trailId: createPermitDto.trailId,
        date: new Date(createPermitDto.date),
      },
      include: {
        hiker: true,
        trail: true,
      },
    });
  }

  // FIND ALL
  async findAll() {
    return this.prisma.permit.findMany({
      include: {
        hiker: true,
        trail: true,
      },
    });
  }

  // FIND ONE
  async findOne(id: string) {
    const permit = await this.prisma.permit.findUnique({
      where: { id },
      include: {
        hiker: true,
        trail: true,
      },
    });

    // Error handling
    if (!permit) {
      throw new NotFoundException(
        `Izin (Permit) dengan ID ${id} tidak ditemukan`,
      );
    }

    return permit;
  }

  // UPDATE
  async update(id: string, updatePermitDto: UpdatePermitDto) {
    await this.findOne(id);

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
    await this.findOne(id);

    return this.prisma.permit.delete({
      where: { id },
    });
  }
}
