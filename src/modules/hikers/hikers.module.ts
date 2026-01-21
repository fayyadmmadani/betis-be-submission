import { Module } from '@nestjs/common';
import { HikersService } from './hikers.service';
import { HikersController } from './hikers.controller';

@Module({
  controllers: [HikersController],
  providers: [HikersService],
})
export class HikersModule {}
