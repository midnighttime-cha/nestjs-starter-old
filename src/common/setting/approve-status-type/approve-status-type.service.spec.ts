import { Test, TestingModule } from '@nestjs/testing';
import { ApproveStatusTypeService } from './approve-status-type.service';

describe('ApproveStatusTypeService', () => {
  let service: ApproveStatusTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApproveStatusTypeService],
    }).compile();

    service = module.get<ApproveStatusTypeService>(ApproveStatusTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
