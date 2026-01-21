import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreatePermitDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID pendaki',
  })
  @IsUUID()
  @IsNotEmpty()
  hikerId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID jalur',
  })
  @IsUUID()
  @IsNotEmpty()
  trailId: string;

  @ApiProperty({
    example: '2024-08-20T08:00:00Z',
    description: 'Tanggal perizinan dibuat (ISO 8601)',
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;
}
