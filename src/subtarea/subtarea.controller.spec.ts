import { Test, TestingModule } from '@nestjs/testing';
import { SubtareaController } from './subtarea.controller';
import { SubtareaService } from './subtarea.service';

describe('SubtareaController', () => {
  let controller: SubtareaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubtareaController],
      providers: [SubtareaService],
    }).compile();

    controller = module.get<SubtareaController>(SubtareaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
