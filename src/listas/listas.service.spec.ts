import { Test, TestingModule } from '@nestjs/testing';
import { ListasService } from './listas.service';

describe('CategoriasService', () => {
  let service: ListasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListasService],
    }).compile();

    service = module.get<ListasService>(ListasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});



