import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateSubtareaDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsBoolean()
  completada?: boolean;
}
