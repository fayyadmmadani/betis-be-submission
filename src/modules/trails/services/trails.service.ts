import { Injectable, NotFoundException } from '@nestjs/common'; // <--- Tambah NotFoundException
import { CreateTrailDto } from '../dto/create-trail.dto';
import { UpdateTrailDto } from '../dto/update-trail.dto';
import { PrismaService } from '../../../config/prisma/prisma.service';

@Injectable()
export class TrailsService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  async create(createTrailDto: CreateTrailDto) {
    return this.prisma.trail.create({
      data: {
        name: createTrailDto.name,
        difficulty: createTrailDto.difficulty,
        openedAt: new Date(createTrailDto.openedAt),
        isOpen: createTrailDto.isOpen,
      },
    });
  }

  // FIND ALL
  async findAll() {
    return this.prisma.trail.findMany();
  }

  // FIND ONE
  async findOne(id: string) {
    const trail = await this.prisma.trail.findUnique({
      where: { id },
    });

    // Error handling
    if (!trail) {
      throw new NotFoundException(`Jalur dengan ID ${id} tidak ditemukan`);
    }

    return trail;
  }

  // UPDATE
  async update(id: string, updateTrailDto: UpdateTrailDto) {
    await this.findOne(id);

    return this.prisma.trail.update({
      where: { id },
      data: {
        ...updateTrailDto,
        openedAt: updateTrailDto.openedAt
          ? new Date(updateTrailDto.openedAt)
          : undefined,
      },
    });
  }

  // DELETE
  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.trail.delete({
      where: { id },
    });
  }
}
