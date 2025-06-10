import { Module } from '@nestjs/common';
import { SubtareaService } from './subtarea.service';
import { SubtareaController } from './subtarea.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarea } from 'src/tarea/entities/tarea.entity';
import { Subtarea } from './entities/subtarea.entity';
import { AutenticacionModule } from 'src/autenticacion/autenticacion.module';

@Module({
  controllers: [SubtareaController],
  providers: [SubtareaService],
  imports: [TypeOrmModule.forFeature([Tarea, Subtarea]), AutenticacionModule]
})
export class SubtareaModule {}
