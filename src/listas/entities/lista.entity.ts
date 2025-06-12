import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { OneToMany } from 'typeorm';
import { Tarea } from '../../tarea/entities/tarea.entity';
import { ManyToMany, JoinTable } from 'typeorm';
import { User } from 'src/users/entities/user.entity';



@Entity('listas')
export class Lista {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Tarea, (tarea) => tarea.lista)
  tareas: Tarea;


  @ManyToMany(() => User, user => user.listasCompartidas)
  usuariosCompartidos: User[];

  @ManyToOne(() => User, user => user.listasPropias, { eager: false })
  @JoinColumn({ name: 'propietarioId' })
  propietario: User;
}



