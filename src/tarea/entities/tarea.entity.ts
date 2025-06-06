import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Category } from '../../categorias/entities/categoria.entity';
import { User } from '../../users/entities/user.entity';

@Entity('tareas')
export class Tarea {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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

    @ManyToOne(() => User, (user) => user.tarea, { eager: true })
    @JoinColumn({ name: 'usuarioId' })
    usuario: User;

    @Column()
    usuarioId: string;

    @ManyToOne(() => Category, (category) => category.tarea, { eager: true, nullable: true })
    @JoinColumn({ name: 'categoriaId' })
    categoria: Category;

    @Column({ nullable: true })
    categoriaId: string;
}
