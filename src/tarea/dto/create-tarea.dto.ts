import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  IsUUID,
  IsBoolean,
} from 'class-validator';

export class CreateTareaDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsEnum(['pendiente', 'progreso', 'completada'])
  @IsOptional()
  estado?: string;

  
  @IsNotEmpty()
  usuarioId: number;

  @IsOptional()
  categoriaId?: number;

  @IsBoolean()
  favorito: boolean;

  @IsBoolean()
  realizada: boolean;
}
