import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString, IsUUID } from 'class-validator';

export class CreateTareaDto {
    @IsString()
    @IsNotEmpty()
    titulo: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsEnum(['pendiente', 'en_progreso', 'completada'])
    @IsOptional()
    estado?: string;

    @IsEnum(['baja', 'media', 'alta'])
    @IsOptional()
    prioridad?: string;

    @IsDateString()
    @IsOptional()
    fechaVencimiento?: Date;

    @IsUUID()
    @IsNotEmpty()
    usuarioId: string;

    @IsUUID()
    @IsOptional()
    categoriaId?: string;
}