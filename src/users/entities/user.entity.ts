import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { OneToMany } from 'typeorm';
import { Tarea } from '../../tarea/entities/tarea.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  edad: number;

  @Column()
  password: string;

   // Relación con Tareas
    @OneToMany(() => Tarea, (tarea) => tarea.usuario)
    tarea: Tarea[];
}
