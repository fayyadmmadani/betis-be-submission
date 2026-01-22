import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.enableCors();

  // --- CONFIG SWAGGER ---
  const config = new DocumentBuilder()
    .setTitle("The Ranger's Outpost API")
    .setDescription('Sistem manajemen jalur pendakian, pendaki, dan perizinan.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // localhost:3000/api-docs
  // --- END CONFIG SWAGGER ---

  await app.listen(process.env.PORT || 3000);
}
export default bootstrap;
void bootstrap();
