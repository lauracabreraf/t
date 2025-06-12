import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TareaService } from './tarea.service';
import { TareaController } from './tarea.controller';
import { Tarea } from './entities/tarea.entity';
import { AutenticacionModule } from 'src/autenticacion/autenticacion.module';
import { Lista } from 'src/listas/entities/lista.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Tarea, Lista]), AutenticacionModule],
  providers: [TareaService],
  controllers: [TareaController],
  exports: [TareaService],
})
export class TareasModule {}
