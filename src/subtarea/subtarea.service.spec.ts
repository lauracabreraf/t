import { Test, TestingModule } from '@nestjs/testing';
import { SubtareaService } from './subtarea.service';

describe('SubtareaService', () => {
  let service: SubtareaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubtareaService],
    }).compile();

    service = module.get<SubtareaService>(SubtareaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
