import { Test, TestingModule } from '@nestjs/testing';
import { BoilOrdersService } from './boil_orders.service';

describe('BoilOrdersService', () => {
  let service: BoilOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoilOrdersService],
    }).compile();

    service = module.get<BoilOrdersService>(BoilOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
