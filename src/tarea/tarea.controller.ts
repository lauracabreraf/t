import { Controller, Get, Post, Put, Delete, Param, Body, UploadedFile, UseInterceptors} from '@nestjs/common';
import { TareaService } from './tarea.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { Tarea } from './entities/tarea.entity';
import { GetUser } from 'src/autenticacion/decorators/get-user.decorator'; 
import { User } from 'src/users/entities/user.entity';
import { Response } from 'express';
import { Res } from '@nestjs/common';
import { Parser } from 'json2csv';
import { FileInterceptor } from '@nestjs/platform-express';






@Controller('tarea')
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


    @Get('usuario/:usuarioId')
  async findByUser(@Param('usuarioId') usuarioId: number): Promise<Tarea[]> {
    return this.tareasService.findByUser(usuarioId);
  }

  @Get('lista/:listaId')
  async findByCategory(
    @Param('listaId') listaId: number,
  ): Promise<Tarea[]> {
    return this.tareasService.findByLista(listaId);
  }



  
//BAJAR DATA

  @Get('exportar/csv')
  async exportarTareasCSV(@Res() res: Response) {
    const tareas = await this.tareasService.findAll();

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

    res.header('Content-Type', 'text/csv');
    res.attachment('tareas.csv');
    return res.send(csv);
  }


  
  //SUBIR DATA
  @Post('importar/csv')

  @UseInterceptors(FileInterceptor('file', {
    dest: './uploads',
  })) 

  async importarCsv(@UploadedFile()
  file:Express.Multer.File) {
  return this.tareasService.importarDesdeCsv(file);
 }



 //SUBIR DESDE EL SERVIDOR SFTP
    @Get('importar-sftp')
    async importarDesdeFtp() {
    await this.tareasService.importarArchivoDesdeSftp();
    return { message: 'Archivo descargado correctamente desde FTP' };
  }


  // BAJAR Y GUARDAR EN EL SERVIDOR SFTP
  @Get('exportar-sftp')
  async exportarDesdeFtp() {
  await this.tareasService.exportarArchivoDesdeSftp();
  return { message: 'Archivo csv generado y guardado exitosamente en el servidor' };
}


 //LEER Y MOSTRAR EL CONTENIDO DE CSV 
   @Get('leer-csv')
   async leerCsv() {
   return this.tareasService.leerCsvLocal();
}


  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Tarea> {
    return this.tareasService.findOne(id);
  }


  

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


  

  

  

     

