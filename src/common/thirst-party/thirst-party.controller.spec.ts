import { Test, TestingModule } from '@nestjs/testing';
import { ThirstPartyController } from './thirst-party.controller';

describe('ThirstParty Controller', () => {
  let controller: ThirstPartyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThirstPartyController],
    }).compile();

    controller = module.get<ThirstPartyController>(ThirstPartyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
