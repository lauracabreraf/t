import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Get,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { SubtareaService } from './subtarea.service';
import { CreateSubtareaDto } from './dto/create-subtarea.dto';
import { UpdateSubtareaDto } from './dto/update-subtarea.dto';

@Controller('subtareas')
export class SubtareaController {
  constructor(private readonly subtareaService: SubtareaService) {}

  @Post()
  async create(@Body() createSubtareaDto: CreateSubtareaDto) {
    return this.subtareaService.create(createSubtareaDto);
  }

  @Get()
  async findAll(){
    return this.subtareaService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubtareaDto: UpdateSubtareaDto,
  ) {
    return this.subtareaService.update(id, updateSubtareaDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.subtareaService.remove(id);
  }

  @Get('tarea/:tareaId')
  async findByTarea(@Param('tareaId', ParseIntPipe) tareaId: number) {
    return this.subtareaService.buscarPorTarea(tareaId);
  }

  @Patch('actualizar/id/:id')
  async marcarComoCompletada(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedDto: UpdateSubtareaDto,
  ) {
    return this.subtareaService.actualizaSubTarea(id, updatedDto);
  }

  @Get('usuario/:usuarioId')
  async findByUsuario(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
    return this.subtareaService.buscarPorUsuario(usuarioId);
  }
}
