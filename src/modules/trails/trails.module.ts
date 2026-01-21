import { Module } from '@nestjs/common';
import { TrailsService } from './services/trails.service';
import { TrailsController } from './controllers/trails.controller';

@Module({
  controllers: [TrailsController],
  providers: [TrailsService],
})
export class TrailsModule {}
