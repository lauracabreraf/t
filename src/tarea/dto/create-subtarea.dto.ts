import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateSubtareaDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsOptional()
  @IsBoolean()
  completada?: boolean;

  @IsNotEmpty()
  tareaId: number;
}
