import {
  Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards,


} from '@nestjs/common';
import { TareaService } from './tarea.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { Tarea } from './entities/tarea.entity';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from 'src/autenticacion/decorators/get-user.decorator'; // ← ajusta el path si es distinto
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/autenticacion/estrategias/jwt-auth.guard';


@Controller('tarea')
@UseGuards(JwtAuthGuard)
export class TareaController {
  constructor(private readonly tareasService: TareaService) {}

  @Get('listar/estado/:estado')
  async findAllByEstado(@Param('estado') estado: string) {
    return this.tareasService.findAllByEstado(estado);
  }

  @Get('listar/all')
  async findAll() {
    return this.tareasService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Tarea> {
    return this.tareasService.findOne(id);
  }

  @Get('usuario/:usuarioId')
  async findByUser(@Param('usuarioId') usuarioId: number): Promise<Tarea[]> {
    return this.tareasService.findByUser(usuarioId);
  }

  @Get('categoria/:categoriaId')
  async findByCategory(
    @Param('categoriaId') categoriaId: number,
  ): Promise<Tarea[]> {
    return this.tareasService.findByCategory(categoriaId);
  }

  @UseGuards(AuthGuard())
  @Post()
  async create(@Body() createTareaDto: CreateTareaDto,
  @GetUser() user: User,
   ): Promise<Tarea> {
    return this.tareasService.create(createTareaDto, user);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTareaDto: UpdateTareaDto,
  ): Promise<Tarea> {
    return this.tareasService.update(id, updateTareaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.tareasService.remove(id);
  }
}
