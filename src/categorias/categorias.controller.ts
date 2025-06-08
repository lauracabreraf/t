import {
  Controller, Get, Post, Put, Delete,Param,
  Body, UseGuards,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/categoria.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('categorias')
@UseGuards(AuthGuard('jwt'))
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriasService.findALL();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Category> {
    return this.categoriasService.findOne(id);
  }

  

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriasService.create(createCategoryDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriasService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.categoriasService.remove(id);
  }
}
