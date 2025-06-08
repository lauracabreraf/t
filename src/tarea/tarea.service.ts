import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from './entities/tarea.entity';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';

@Injectable()
export class TareaService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
  ) {}

  async findAllByEstado(estado: string): Promise<Tarea[]> {
    return await this.tareaRepository.find({
      relations: ['usuario', 'categoria'],
      where: { estado },
    });
  }

  async create(createTareaDto: CreateTareaDto): Promise<Tarea> {
    const nuevaTarea = this.tareaRepository.create({
      ...createTareaDto,
      categoria: {
        id: createTareaDto.categoriaId,
      },
      usuario: {
        id: createTareaDto.usuarioId,
      },
    });
    return await this.tareaRepository.save(nuevaTarea);
  }

  async findOne(id: number): Promise<Tarea> {
    const tarea = await this.tareaRepository.findOne({
      where: { id },
      relations: ['usuario', 'categoria'],
    });

    if (!tarea) {
      throw new NotFoundException(`Tarea with id ${id} not found`);
    }

    return tarea;
  }

  async findByUser(usuarioId: number): Promise<Tarea[]> {
    return this.tareaRepository.find({
      where: {
        usuario: {
          id: usuarioId,
        },
      },
      relations: ['usuario', 'categoria'],
    });
  }

  async findByCategory(categoriaId: number): Promise<Tarea[]> {
    return this.tareaRepository.find({
      where: {
        categoria: {
          id: categoriaId,
        },
      },
      relations: ['usuario', 'categoria'],
    });
  }

  async update(id: number, updateTareaDto: UpdateTareaDto): Promise<Tarea> {
    await this.findOne(id);
    return await this.tareaRepository.save({ id, ...updateTareaDto });
  }

  async remove(id: number): Promise<void> {
    const result = await this.tareaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tarea with id ${id} not found`);
    }
  }

  async findAll() {
    return this.tareaRepository.find({
      relations: ['usuario', 'categoria'],
    });
  }
}
