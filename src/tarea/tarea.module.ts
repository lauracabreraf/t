import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TareaService } from './tarea.service';
import { TareaController } from './tarea.controller';
import { Tarea } from './entities/tarea.entity';
import { AutenticacionModule } from 'src/autenticacion/autenticacion.module';
import { Subtarea } from './entities/subtarea.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Tarea, Subtarea]), AutenticacionModule],
  providers: [TareaService],
  controllers: [TareaController],
  exports: [TareaService],
})
export class TareasModule {}
