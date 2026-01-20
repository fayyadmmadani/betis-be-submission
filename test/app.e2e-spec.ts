import { Test, TestingModule } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';

interface IdResponse {
  id: string;
}

interface PermitResponse {
  id: string;
  hiker?: unknown;
  trail?: unknown;
}

describe('AppController (e2e)', () => {
  let app: NestExpressApplication;
  let prisma: PrismaService;

  let trailId: string;
  let hikerId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();

    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );

    await app.init();
    prisma = app.get(PrismaService);

    await prisma.permit.deleteMany();
    await prisma.hiker.deleteMany();
    await prisma.trail.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  // --- SKENARIO TEST ---

  // Trails Post
  it('/trails (POST) - Create Trail', async () => {
    const response = await request(app.getHttpServer())
      .post('/trails')
      .send({
        name: 'Gunung E2E Test',
        difficulty: 'MODERATE',
        openedAt: '2025-01-01T08:00:00Z',
        isOpen: true,
      })
      .expect(201);

    const body = response.body as IdResponse;
    trailId = body.id;
  });

  // Hikers Post
  it('/hikers (POST) - Create Hiker', async () => {
    const response = await request(app.getHttpServer())
      .post('/hikers')
      .send({
        name: 'Robot Tester',
        age: 30,
        level: 'NEWBIE',
      })
      .expect(201);

    const body = response.body as IdResponse;
    hikerId = body.id;
  });

  // Permits Post - Success
  it('/permits (POST) - Create Permit Success', async () => {
    const response = await request(app.getHttpServer())
      .post('/permits')
      .send({
        hikerId: hikerId,
        trailId: trailId,
        date: '2026-05-20T08:00:00Z',
      })
      .expect(201);

    const body = response.body as PermitResponse;

    if (!body.hiker || !body.trail) {
      throw new Error(
        'Response tidak memuat detail hiker/trail (Include gagal)',
      );
    }
  });

  // Permits Post - Fail Invalid Hiker ID
  it('/permits (POST) - Create Permit Fail (Invalid ID)', async () => {
    await request(app.getHttpServer())
      .post('/permits')
      .send({
        hikerId: '00000000-0000-0000-0000-000000000000',
        trailId: trailId,
        date: '2026-05-20T08:00:00Z',
      })
      .expect(404);
  });
});
