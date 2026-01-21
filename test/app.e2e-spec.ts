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

  // --- SCENARIO TEST ---

  // - CREATE -

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

  // - READ -

  // Get All Trails
  it('/trails (GET) - Get All Trails', async () => {
    const response = await request(app.getHttpServer())
      .get('/trails')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);

    expect((response.body as Array<unknown>).length).toBeGreaterThan(0);
  });

  // Get Trail By ID
  it('/trails/:id (GET) - Get Detail Trail', async () => {
    const response = await request(app.getHttpServer())
      .get(`/trails/${trailId}`)
      .expect(200);

    const body = response.body as IdResponse & { name: string };
    expect(body.id).toEqual(trailId);
    expect(body.name).toEqual('Gunung E2E Test');
  });

  // Get Hiker By ID
  it('/hikers/:id (GET) - Get Detail Hiker', async () => {
    const response = await request(app.getHttpServer())
      .get(`/hikers/${hikerId}`)
      .expect(200);

    const body = response.body as IdResponse & { name: string };
    expect(body.id).toEqual(hikerId);
    expect(body.name).toEqual('Robot Tester');
  });

  // - UPDATE -

  // Update Trail (PATCH)
  it('/trails/:id (PATCH) - Update Trail', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/trails/${trailId}`)
      .send({
        name: 'Gunung E2E Updated',
        difficulty: 'HARD',
      })
      .expect(200);

    const body = response.body as IdResponse & {
      name: string;
      difficulty: string;
    };

    expect(body.id).toEqual(trailId);
    expect(body.name).toEqual('Gunung E2E Updated');
    expect(body.difficulty).toEqual('HARD');
  });

  // - DELETE -

  // Delete Permit (DELETE)
  it('/permits/:id (DELETE) - Delete Permit', async () => {
    const permitsRes = await request(app.getHttpServer())
      .get('/permits')
      .expect(200);

    const permits = permitsRes.body as PermitResponse[];

    if (permits.length === 0) {
      throw new Error('Tidak ada permit untuk dihapus (Test Delete Gagal)');
    }

    const permitIdToDelete = permits[0].id;

    await request(app.getHttpServer())
      .delete(`/permits/${permitIdToDelete}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/permits/${permitIdToDelete}`)
      .expect(404);
  });

  // 3. Delete Hiker (DELETE)
  it('/hikers/:id (DELETE) - Delete Hiker', async () => {
    await request(app.getHttpServer()).delete(`/hikers/${hikerId}`).expect(200);

    await request(app.getHttpServer()).get(`/hikers/${hikerId}`).expect(404);
  });
});
