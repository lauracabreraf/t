import {
  Controller, Get, Post, Put, Delete,Param,
  Body, UseGuards,
} from '@nestjs/common';
import { ListasService } from './listas.service';
import { CreateListaDto } from './dto/create-lista.dto';
import { UpdateListaDto } from './dto/update-lista.dto';
import { Lista } from './entities/lista.entity';
import { AuthGuard } from '@nestjs/passport';
import { Patch } from '@nestjs/common';
import { CompartirListaDto } from './dto/compartir-lista.dto';

@Controller('listas')
@UseGuards(AuthGuard('jwt'))
export class ListasController {
  constructor(private readonly listasService: ListasService) {}

  @Get()
  async findAll(): Promise<Lista[]> {
    return this.listasService.findALL();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Lista> {
    return this.listasService.findOne(id);
  }


  @Post()
  async create(
    @Body() createCategoryDto: CreateListaDto,
  ): Promise<Lista> {
    return this.listasService.create(createCategoryDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateListaDto,
  ): Promise<Lista> {
    return this.listasService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.listasService.remove(id);
  }

  @Patch('compartir')
  async compartirLista(@Body() compartirListaDto: CompartirListaDto) {
  return this.listasService.compartirLista(compartirListaDto);
}


}
