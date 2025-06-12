import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from './entities/tarea.entity';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { User } from 'src/users/entities/user.entity';
import { Lista } from 'src/listas/entities/lista.entity';


@Injectable()
export class TareaService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,

    @InjectRepository(Lista)
    private readonly listaRepository: Repository<Lista>,
  ) {}

  async findAllByEstado(estado: string): Promise<Tarea[]> {
    return await this.tareaRepository.find({
      relations: ['usuario', 'lista'],
      where: { estado },
    });
  }

  async create(createTareaDto: CreateTareaDto, user: User): Promise<Tarea> {

    const nuevaTarea = this.tareaRepository.create({
      ...createTareaDto,
      usuario: {
        id: createTareaDto.usuarioId,
      }
    });
    return await this.tareaRepository.save(nuevaTarea);
  }

  async findOne(id: number): Promise<Tarea> {
    const tarea = await this.tareaRepository.findOne({
      where: { id },
      relations: ['usuario', 'lista'],
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
      relations: ['usuario', 'lista'],
    });
  }

  async findByLista(listaId: number): Promise<Tarea[]> {
    return this.tareaRepository.find({
      where: {
        lista: {
          id: listaId,
        },
      },
      relations: ['usuario', 'lista'],
    });
  }

  async update(id: number, updateTareaDto: UpdateTareaDto): Promise<Tarea> {
  const tarea = await this.findOne(id);
  if (!updateTareaDto || Object.keys(updateTareaDto).length === 0) {
    throw new Error('No se enviaron datos para actualizar');
  }
  Object.assign(tarea, updateTareaDto);
  return await this.tareaRepository.save(tarea);
}


  async remove(id: number): Promise<void> {
    const result = await this.tareaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Tarea with id ${id} not found`);
    }
  }

  async findAll() {
    return this.tareaRepository.find({
      relations: ['usuario', 'lista', 'subtareas'],
    });
  }


}
