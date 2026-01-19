import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';
import { Difficulty } from '@prisma/client'; // Import Enum dari Prisma

export class CreateTrailDto {
  @IsString()
  @IsNotEmpty()
  name: string; // Wajib: Nama jalur (String)

  @IsEnum(Difficulty)
  @IsNotEmpty()
  difficulty: Difficulty; // Wajib: Pilihan (BEGINNER, MODERATE, dll)

  @IsDateString()
  @IsNotEmpty()
  openedAt: string; // Wajib: Tanggal (Format ISO 8601)

  @IsBoolean()
  @IsOptional() // Tidak wajib (karena defaultnya true/buka)
  isOpen?: boolean;
}
