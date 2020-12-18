import { Test, TestingModule } from '@nestjs/testing';
import { ApproveStatusController } from './approve-status.controller';

describe('ApproveStatus Controller', () => {
  let controller: ApproveStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApproveStatusController],
    }).compile();

    controller = module.get<ApproveStatusController>(ApproveStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
