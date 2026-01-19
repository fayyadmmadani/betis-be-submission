import { Test, TestingModule } from '@nestjs/testing';
import { HikersService } from './hikers.service';

describe('HikersService', () => {
  let service: HikersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HikersService],
    }).compile();

    service = module.get<HikersService>(HikersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
