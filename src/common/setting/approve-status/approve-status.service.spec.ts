import { Test, TestingModule } from '@nestjs/testing';
import { ApproveStatusService } from './approve-status.service';

describe('ApproveStatusService', () => {
  let service: ApproveStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApproveStatusService],
    }).compile();

    service = module.get<ApproveStatusService>(ApproveStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
