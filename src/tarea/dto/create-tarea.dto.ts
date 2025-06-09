import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
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


  @IsOptional()
  categoriaId?: number;

  @IsBoolean()
  favorito: boolean;

  @IsBoolean()
  realizada: boolean;

  @IsOptional()
  @IsString()
  nota?: string; 

  @IsOptional()
  @IsDateString()
  fechaVencimiento?: string;
}
