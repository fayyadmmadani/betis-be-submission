import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreatePermitDto {
  @IsUUID()
  @IsNotEmpty()
  hikerId: string;

  @IsUUID()
  @IsNotEmpty()
  trailId: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;
}
