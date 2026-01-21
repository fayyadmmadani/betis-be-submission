import { PartialType } from '@nestjs/swagger';
import { CreateHikerDto } from './create-hiker.dto';

export class UpdateHikerDto extends PartialType(CreateHikerDto) {}
