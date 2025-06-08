import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { OneToMany } from 'typeorm';
import { Tarea } from '../../tarea/entities/tarea.entity';


@Entity('categorias')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  // Relación con Tareas
  @OneToMany(() => Tarea, (tarea) => tarea.categoria)
  tarea: Tarea[];
}



