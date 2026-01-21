import { Module } from '@nestjs/common';
import { PermitsService } from './services/permits.service';
import { PermitsController } from './controllers/permits.controller';

@Module({
  controllers: [PermitsController],
  providers: [PermitsService],
})
export class PermitsModule {}
