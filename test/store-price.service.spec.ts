import { Test, TestingModule } from '@nestjs/testing';
import { StorePriceService } from '../src/module/store-price/store-price.service';

describe('StorePriceService', () => {
  let service: StorePriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorePriceService],
    }).compile();

    service = module.get<StorePriceService>(StorePriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
