import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/categoria.entity'; 



@Controller('categorias')
export class CategoriasController {
    constructor(private readonly categoriasService: CategoriasService) {}

    @Get()
    async findAll(): Promise<Category[]> {
      return this.categoriasService.findALL();
}


  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
    return this.categoriasService.findOne(id);
  }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriasService.create(createCategoryDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto,): Promise<Category> {
    return this.categoriasService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.categoriasService.remove(id);
  }
}

