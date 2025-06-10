import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { OneToMany } from 'typeorm';
import { Tarea } from '../../tarea/entities/tarea.entity';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  edad: number;

  @Column()
  password: string;

  @OneToMany(() => Tarea, (tarea) => tarea.usuario)
  tarea: Tarea[];
}
