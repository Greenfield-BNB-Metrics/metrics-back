import { Test, TestingModule } from '@nestjs/testing';
import { StorePriceController } from '../src/module/store-price/store-price.controller';

describe('StorePriceController', () => {
  let controller: StorePriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorePriceController],
    }).compile();

    controller = module.get<StorePriceController>(StorePriceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
