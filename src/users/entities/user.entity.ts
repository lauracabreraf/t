import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { OneToMany } from 'typeorm';
import { Tarea } from '../../tarea/entities/tarea.entity';
import { Lista } from '../../listas/entities/lista.entity';

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

  @OneToMany(() => Tarea, (tareas) => tareas.usuario)
  tareas: Tarea[];


  @ManyToMany(() => Lista, lista => lista.usuariosCompartidos)
  @JoinTable()
  listasCompartidas: Lista[];

  @OneToMany(() => Lista, lista => lista.propietario)
  listasPropias: Lista[];
}
