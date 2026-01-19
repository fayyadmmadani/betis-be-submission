import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // <--- Tambahkan ini agar bisa diakses dari mana saja
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // <--- Export agar modul lain bisa pakai
})
export class PrismaModule {}
