import { Test, TestingModule } from '@nestjs/testing';
import { BoilOrdersController } from './boil_orders.controller';

describe('BoilOrdersController', () => {
  let controller: BoilOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoilOrdersController],
    }).compile();

    controller = module.get<BoilOrdersController>(BoilOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
