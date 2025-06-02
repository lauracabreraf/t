import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { OneToMany } from 'typeorm';
import { Tarea } from '../../tarea/entities/tarea.entity';

@Entity('todolist')  
export class Category {
  @PrimaryGeneratedColumn('uuid')  
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

   // Relación con Tareas
  @OneToMany(() => Tarea, (tarea) => tarea.categoria)
  tarea: Tarea[];
}
