import { Test, TestingModule } from '@nestjs/testing';
import { ListasController } from './listas.controller';

describe('CategoriasController', () => {
  let controller: ListasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListasController],
    }).compile();

    controller = module.get<ListasController>(ListasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
