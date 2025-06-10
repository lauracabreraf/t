import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateSubtareaDto {
  @IsString()
  @IsOptional()
  titulo: string;

  @IsOptional()
  @IsBoolean()
  completada?: boolean;

  @IsNotEmpty()
  @IsOptional()
  tareaId: number;
}
