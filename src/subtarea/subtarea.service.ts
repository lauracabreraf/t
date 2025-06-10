import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subtarea } from './entities/subtarea.entity';
import { CreateSubtareaDto } from './dto/create-subtarea.dto';
import { UpdateSubtareaDto } from './dto/update-subtarea.dto';

@Injectable()
export class SubtareaService {
  constructor(
    @InjectRepository(Subtarea)
    private readonly subtareaRepository: Repository<Subtarea>,
  ) {}


  async findAll(): Promise<Subtarea[]> {
     return await this.subtareaRepository.find({
      relations: ['tarea'],
     })
  }

  async create(createSubtareaDto: CreateSubtareaDto): Promise<Subtarea> {
    const nuevaSubtarea = this.subtareaRepository.create(createSubtareaDto);
    return this.subtareaRepository.save({
      ...nuevaSubtarea,
      tarea: {
        id: createSubtareaDto.tareaId
      }
    });
  }

  async update(id: number, updateSubtareaDto: UpdateSubtareaDto): Promise<Subtarea> {
    const subtarea = await this.subtareaRepository.findOne({ where: { id } });

    if (!subtarea) {
      throw new NotFoundException(`Subtarea con ID ${id} no encontrada`);
    }

    const subtareaActualizada = this.subtareaRepository.merge(subtarea, updateSubtareaDto);
    return this.subtareaRepository.save(subtareaActualizada);
  }

  async remove(id: number): Promise<void> {
    const result = await this.subtareaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Subtarea con ID ${id} no encontrada`);
    }
  }

  async buscarPorTarea(tareaId: number): Promise<Subtarea[]> {
    return this.subtareaRepository.find({
      where: { tarea: { id: tareaId } },
    });
  }

   async actualizaSubTarea(id: number, dtoEdit: UpdateSubtareaDto): Promise<Subtarea> {
    const subtarea = await this.subtareaRepository.findOne({ where: { id } });

    if (!subtarea) {
      throw new NotFoundException(`Subtarea con ID ${id} no encontrada`);
    }

    const subtareaActualizada = this.subtareaRepository.merge(subtarea, dtoEdit);
    return await this.subtareaRepository.save(subtareaActualizada);
  }

  async buscarPorUsuario(usuarioId: number): Promise<Subtarea[]> {
  return await this.subtareaRepository.find({
    where: {
      tarea: {
        usuario: {
          id: usuarioId,
        }
      }
    },
  });

  }
}
