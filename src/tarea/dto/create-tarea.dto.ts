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

  @IsUUID()
  @IsNotEmpty()
  usuarioId: string;

  @IsUUID()
  @IsOptional()
  categoriaId?: string;

  @IsBoolean()
  favorito: boolean;

  @IsBoolean()
  realizada: boolean;
}
