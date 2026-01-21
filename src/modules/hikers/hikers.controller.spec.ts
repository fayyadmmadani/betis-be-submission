import { Test, TestingModule } from '@nestjs/testing';
import { HikersController } from './hikers.controller';
import { HikersService } from './hikers.service';

describe('HikersController', () => {
  let controller: HikersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HikersController],
      providers: [HikersService],
    }).compile();

    controller = module.get<HikersController>(HikersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
