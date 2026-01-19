import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // AKTIFKAN VALIDASI GLOBAL
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Buang data sampah yang tidak ada di DTO
      transform: true, // Otomatis ubah tipe data (misal string -> number)
    }),
  );

  await app.listen(3000);
}
bootstrap();
