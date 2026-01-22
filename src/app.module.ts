import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrailsModule } from './modules/trails/trails.module';
import { HikersModule } from './modules/hikers/hikers.module';
import { PermitsModule } from './modules/permits/permits.module';
import { PrismaModule } from './config/prisma/prisma.module';

@Module({
  imports: [TrailsModule, HikersModule, PermitsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
