import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { HikerLevel } from '@prisma/client';

export class CreateHikerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  age: number;

  @IsEnum(HikerLevel)
  @IsNotEmpty()
  level: HikerLevel;
}
