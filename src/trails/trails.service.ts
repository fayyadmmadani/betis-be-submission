import { Injectable } from '@nestjs/common';
import { CreateTrailDto } from './dto/create-trail.dto';
import { UpdateTrailDto } from './dto/update-trail.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrailsService {
  constructor(private prisma: PrismaService) {}

  // 1. CREATE (Sudah kita buat tadi)
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

  // 2. READ ALL (Lihat Semua)
  async findAll() {
    return this.prisma.trail.findMany();
  }

  // 3. READ ONE (Lihat Satu Detail)
  async findOne(id: string) {
    // Perhatikan: tipe datanya string (UUID)
    return this.prisma.trail.findUnique({
      where: { id },
    });
  }

  // 4. UPDATE (Edit Data)
  async update(id: string, updateTrailDto: UpdateTrailDto) {
    return this.prisma.trail.update({
      where: { id },
      data: {
        ...updateTrailDto,
        // Jika user mengupdate tanggal, kita konversi lagi ke Date object
        openedAt: updateTrailDto.openedAt
          ? new Date(updateTrailDto.openedAt)
          : undefined,
      },
    });
  }

  // 5. DELETE (Hapus Data)
  async remove(id: string) {
    return this.prisma.trail.delete({
      where: { id },
    });
  }
}
