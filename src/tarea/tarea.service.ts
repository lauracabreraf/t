import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from './entities/tarea.entity';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { User } from 'src/users/entities/user.entity';
import { Lista } from 'src/listas/entities/lista.entity';
import * as fs from 'fs';
import * as csv from 'fast-csv';
import { resolve } from 'path';
import { FtpService } from '../ftp/ftp.service';
import { Parser } from 'json2csv';
import * as path from 'path';







@Injectable()
export class TareaService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,

    @InjectRepository(Lista)
    private readonly listaRepository: Repository<Lista>,

    private readonly ftpService: FtpService,

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


  
async importarDesdeCsv(file: Express.Multer.File): Promise<any> {
  const tareasValidas: Partial<Tarea>[] = [];
  const titulosProcesados = new Set<string>();
  let totalFilas = 0;
  let duplicadas = 0;
  let invalidas = 0;

  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(file.path)
      .pipe(csv.parse({ headers: true }))
      .on('error', (error) => reject(error))
      .on('data', async (row) => {
        stream.pause(); 

        totalFilas++;

        const titulo = row.titulo?.trim();
        const estado = row.estado?.trim();

        if (!titulo || !estado) {
          invalidas++;
          stream.resume();
          return;
        }

      
        const fechaVencimiento = row.fechaVencimiento ? new Date(row.fechaVencimiento) : null;
        if (fechaVencimiento && isNaN(fechaVencimiento.getTime())) {
          invalidas++;
          stream.resume();
          return; 
        }

      
        if (titulosProcesados.has(titulo)) {
          duplicadas++;
          stream.resume();
          return;
        }

      
        const existente = await this.tareaRepository.findOne({ where: { titulo } });
        if (existente) {
          duplicadas++;
          stream.resume();
          return;
        }

       
        tareasValidas.push({
          titulo,
          descripcion: row.descripcion,
          estado,
          realizada: row.realizada === 'true',
          favorito: row.favorito === 'true',
          fechaVencimiento: row.fechaVencimiento, 
        });

        titulosProcesados.add(titulo);
        stream.resume(); 
      })
      .on('end', async () => {
        if (tareasValidas.length > 0) {
          await this.tareaRepository.save(tareasValidas);
        }

        resolve({
          mensaje: 'Importación finalizada',
          totalFilas,
          importadas: tareasValidas.length,
          duplicadas,
          invalidas,
        });
      });
  });
}







   async importarArchivoDesdeSftp(): Promise<any> {
  const client = await this.ftpService.conectar();

  const remotePath = '/test/tareas.csv'; 
  const localPath = path.join(__dirname, '..', '..', 'temp', 'tareas_sftp.csv'); 

  
  fs.mkdirSync(path.dirname(localPath), { recursive: true });

  
  await client.get(remotePath, localPath);

  await client.end();


  return new Promise((resolve, reject) => {
    const filas: any[] = [];

    fs.createReadStream(localPath)
      .pipe(csv.parse({ headers: true }))
      .on('data', (row) => {
        console.log('Fila importada desde SFTP:', row);
        filas.push(row);
      })
      .on('end', () => {
        console.log('Importación desde SFTP terminada');
        resolve(filas);
      })
      .on('error', (error) => {
        console.error('Error al leer el CSV desde SFTP:', error);
        reject(error);
      });
  });
}





   async exportarArchivoDesdeSftp(): Promise<void> {
  const tareas = await this.tareaRepository.find({
    relations: ['usuario', 'lista', 'subtareas'],
  });

  const datos = tareas.map((tarea) => ({
    id: tarea.id,
    titulo: tarea.titulo,
    descripcion: tarea.descripcion || '',
    estado: tarea.estado,
    favorito: tarea.favorito ? 'Sí' : 'No',
    realizada: tarea.realizada ? 'Sí' : 'No',
    usuario: tarea.usuario?.username || tarea.usuario?.id || 'Sin usuario',
    lista: tarea.lista?.id || 'Sin lista',
    nota: tarea.nota || '',
    fechaVencimiento: tarea.fechaVencimiento
      ? tarea.fechaVencimiento.toISOString().split('T')[0]
      : '',
    subtareas: tarea.subtareas?.length || 0,
  }));

  const fields = [
    'id',
    'titulo',
    'descripcion',
    'estado',
    'favorito',
    'realizada',
    'usuario',
    'lista',
    'nota',
    'fechaVencimiento',
    'subtareas',
  ];

  const parser = new Parser({ fields });
  const csv = parser.parse(datos);

  const exportPath = path.join(__dirname, '..', '..', 'uploads', 'tareas.csv');
  fs.mkdirSync(path.dirname(exportPath), { recursive: true });
  fs.writeFileSync(exportPath, csv);

  const client = await this.ftpService.conectar();
  await client.mkdir('/test', true);
  await client.end(); 
}



   async leerCsvLocal(): Promise<any> {
  const rutaArchivo = 'test/tareas.csv';

  return new Promise((resolve, reject) => {
    const filas: any[] = [];

    fs.createReadStream(rutaArchivo)
      .pipe(csv.parse({ headers: true }))
      .on('data', (row) => {
        console.log('Fila leída:', row); 
        filas.push(row);
      })
      .on('end', () => {
        console.log('Archivo CSV leído exitosamente');
        resolve(filas); 
      })
      .on('error', (error) => {
        console.error('Error al leer el CSV:', error);
        reject(error);
      });
  });
}

  
  }
  
