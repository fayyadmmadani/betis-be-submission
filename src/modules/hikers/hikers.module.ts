import { Module } from '@nestjs/common';
import { HikersService } from './services/hikers.service';
import { HikersController } from './controllers/hikers.controller';

@Module({
  controllers: [HikersController],
  providers: [HikersService],
})
export class HikersModule {}
