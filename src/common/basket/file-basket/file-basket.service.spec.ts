import { Test, TestingModule } from '@nestjs/testing';
import { FileBasketService } from './file-basket.service';

describe('FileBasketService', () => {
  let service: FileBasketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileBasketService],
    }).compile();

    service = module.get<FileBasketService>(FileBasketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
