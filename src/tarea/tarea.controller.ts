import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TareaService } from './tarea.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { Tarea } from './entities/tarea.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('tarea')
@UseGuards(AuthGuard('jwt'))
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
  async findOne(@Param('id') id: string): Promise<Tarea> {
    return this.tareasService.findOne(id);
  }

  @Get('usuario/:usuarioId')
  async findByUser(@Param('usuarioId') usuarioId: string): Promise<Tarea[]> {
    return this.tareasService.findByUser(usuarioId);
  }

  @Get('categoria/:categoriaId')
  async findByCategory(
    @Param('categoriaId') categoriaId: string,
  ): Promise<Tarea[]> {
    return this.tareasService.findByCategory(categoriaId);
  }

  @Post()
  async create(@Body() createTareaDto: CreateTareaDto): Promise<Tarea> {
    return this.tareasService.create(createTareaDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTareaDto: UpdateTareaDto,
  ): Promise<Tarea> {
    return this.tareasService.update(id, updateTareaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.tareasService.remove(id);
  }
}
