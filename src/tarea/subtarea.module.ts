import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubtareaService } from './subtarea.service';
import { SubtareaController } from './subtarea.controller';
import { Subtarea } from './entities/subtarea.entity';
import { Tarea } from './entities/tarea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subtarea, Tarea])],
  controllers: [SubtareaController],
  providers: [SubtareaService],
})
export class SubtareasModule {}
