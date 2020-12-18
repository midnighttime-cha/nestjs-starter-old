import { Test, TestingModule } from '@nestjs/testing';
import { ApproveStatusTypeController } from './approve-status-type.controller';

describe('ApproveStatusType Controller', () => {
  let controller: ApproveStatusTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApproveStatusTypeController],
    }).compile();

    controller = module.get<ApproveStatusTypeController>(ApproveStatusTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
