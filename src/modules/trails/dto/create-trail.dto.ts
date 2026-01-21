import { ApiProperty } from '@nestjs/swagger';
import { Difficulty } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateTrailDto {
  @ApiProperty({
    example: 'Via Selo',
    description: 'Nama jalur pendakian',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    enum: Difficulty,
    example: 'MODERATE',
    description: 'Tingkat kesulitan jalur',
  })
  @IsEnum(Difficulty)
  @IsNotEmpty()
  difficulty: Difficulty;

  @ApiProperty({
    example: '2024-08-17T08:00:00Z',
    description: 'Tanggal jalur dibuka (ISO 8601)',
  })
  @IsDateString()
  @IsNotEmpty()
  openedAt: string;

  @ApiProperty({
    example: true,
    required: false,
    description: 'Status apakah jalur dibuka untuk umum',
  })
  @IsBoolean()
  @IsOptional()
  isOpen?: boolean;
}
