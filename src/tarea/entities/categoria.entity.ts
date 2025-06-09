import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('todolist')
export class category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    descripcion?: string;
}