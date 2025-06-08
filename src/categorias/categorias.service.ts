import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/categoria.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriaRepository: Repository<Category>,
  ) {}

  async findALL(): Promise<Category[]> {
    return this.categoriaRepository.find();
  }

  async create(createCategoriaDto: CreateCategoryDto) {
    const nuevaCategoria = this.categoriaRepository.create(createCategoriaDto);
    return await this.categoriaRepository.save(nuevaCategoria);
  }

  async findOne(id: number) {
    const category = await this.categoriaRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;
  }

  async update(id: number, UpdateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);
    return await this.categoriaRepository.save({ id, ...UpdateCategoryDto });
  }

  async remove(id: number): Promise<void> {
    const result = await this.categoriaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Category wiht id ${id} not found');
    }
  }
}
