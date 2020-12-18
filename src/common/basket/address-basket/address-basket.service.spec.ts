import { Test, TestingModule } from '@nestjs/testing';
import { AddressBasketService } from './address-basket.service';

describe('AddressBasketService', () => {
  let service: AddressBasketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressBasketService],
    }).compile();

    service = module.get<AddressBasketService>(AddressBasketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
