import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Tarea } from './tarea.entity';
import { User } from 'src/users/entities/user.entity';

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

   @ManyToOne(() => User, (user) => user.subtareas, { onDelete: 'CASCADE' })
  usuario: User;
}
