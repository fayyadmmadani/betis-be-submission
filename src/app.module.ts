import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrailsModule } from './trails/trails.module';
import { HikersModule } from './hikers/hikers.module';
import { PermitsModule } from './permits/permits.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [TrailsModule, HikersModule, PermitsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
