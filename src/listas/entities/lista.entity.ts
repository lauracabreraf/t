import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
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

  // Relación con Tareas
  @OneToMany(() => Tarea, (tarea) => tarea.lista)
  tareas: Tarea[];


  @ManyToMany(() => User, user => user.listasCompartidas)
  @JoinTable()  
  usuariosCompartidos: User[];


  @ManyToOne(() => User, user => user.listasPropias)
  propietario: User;
}



