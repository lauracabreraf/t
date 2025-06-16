import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Lista } from '../../listas/entities/lista.entity';
import { User } from '../../users/entities/user.entity';
import { OneToMany } from 'typeorm';
import { Subtarea } from 'src/subtarea/entities/subtarea.entity';

@Entity('tareas')
export class Tarea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({
    type: 'enum',
    enum: ['pendiente', 'progreso', 'completada'],
    default: 'pendiente',
  })
  estado: string;

  @Column({ type: 'boolean', default: false })
  favorito: boolean;

  @Column({ type: 'boolean', default: false })
  realizada: boolean;

  @ManyToOne(() => User, (user) => user.tareas, { eager: true })
  @JoinColumn({ name: 'usuarioId' })
  usuario: User;

  @ManyToOne(() => Lista, (lista) => lista.tareas, {eager: true, nullable: true,})
  @JoinColumn( { name: 'listaId'})
  lista?: Lista;

  @Column({ type: 'text', nullable: true })
  nota?: string;

  @Column({ type: 'timestamp', nullable: true })
  fechaVencimiento?: Date;

  @OneToMany(() => Subtarea, (subtarea) => subtarea.tarea, {
    cascade: true,
  })
  subtareas: Subtarea[];
}


