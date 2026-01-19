import { PartialType } from '@nestjs/mapped-types';
import { CreateHikerDto } from './create-hiker.dto';

export class UpdateHikerDto extends PartialType(CreateHikerDto) {}
