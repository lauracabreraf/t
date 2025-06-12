import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lista } from './entities/lista.entity';
import { CreateListaDto } from './dto/create-lista.dto';
import { UpdateListaDto } from './dto/update-lista.dto';
import { User } from 'src/users/entities/user.entity';
import { CompartirListaDto } from './dto/compartir-lista.dto';
import { In } from 'typeorm';

@Injectable()
export class ListasService {
  constructor(
    @InjectRepository(Lista)
    private readonly listaRepository: Repository<Lista>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findALL(): Promise<Lista[]> {
    return this.listaRepository.find({
      relations: ['tareas', 'propietario', 'usuariosCompartidos'],
    });
  }

  async create(createListaDto: CreateListaDto) {
    const nuevaLista = this.listaRepository.create(createListaDto);
    return await this.listaRepository.save(nuevaLista);
  }

  async findOne(id: number) {
    const lista = await this.listaRepository.findOneBy({ id });
    if (!lista) {
      throw new NotFoundException(`Lista con id ${id} no encontrada`);
    }

    return lista;
  }

  async update(id: number, updateListaDto: UpdateListaDto): Promise<Lista> {
    const lista = await this.findOne(id);

    if (!lista) {
      throw new NotFoundException(`Lista con id ${id} no encontrada`);
    }

    if (Object.keys(updateListaDto).length === 0) {
      throw new BadRequestException('No se enviaron datos para actualizar');
    }

    Object.assign(lista, updateListaDto);

    return await this.listaRepository.save(lista);
  }

  async remove(id: number): Promise<void> {
    const result = await this.listaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Lista con id  ${id} no encontrada`);
    }
  }

  async compartirLista(compartirDto: CompartirListaDto): Promise<Lista> {
    const { listaId, usuariosIds } = compartirDto;

    const lista = await this.listaRepository.findOne({
      where: { id: listaId },
      relations: ['usuariosCompartidos'],
    });

    if (!lista) {
      throw new NotFoundException('Lista no encontrada');
    }

    const usuarios = await this.userRepository.find({
      where: { id: In(usuariosIds) },
    });

    if (usuarios.length !== usuariosIds.length) {
      throw new NotFoundException('Algunos usuarios no fueron encontrados');
    }

    lista.usuariosCompartidos = usuarios;

    return this.listaRepository.save(lista);
  }

  async findOneByUser(id: number) {
    return await this.listaRepository.find({
      where: {
        usuariosCompartidos: {
          id: id,
        },
      },
      relations: ['tareas', 'tareas.subtareas', 'usuariosCompartidos'],
    })
  }
}