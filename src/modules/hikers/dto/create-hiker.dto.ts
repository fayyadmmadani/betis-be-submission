import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { HikerLevel } from '@prisma/client';

export class CreateHikerDto {
  @ApiProperty({
    example: 'Budi',
    description: 'Nama pendaki',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 25,
    description: 'Usia pendaki',
  })
  @IsInt()
  @Min(1)
  age: number;

  @ApiProperty({
    enum: HikerLevel,
    example: HikerLevel.NEWBIE,
    description: 'Tingkat keahlian pendaki',
  })
  @IsEnum(HikerLevel)
  @IsNotEmpty()
  level: HikerLevel;
}
