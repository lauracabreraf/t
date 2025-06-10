import { Tarea } from 'src/tarea/entities/tarea.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('subtareas')
export class Subtarea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ default: false })
  completada: boolean;

  @ManyToOne(() => Tarea, (tarea) => tarea.subtareas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tareaId' })
  tarea: Tarea;
}
