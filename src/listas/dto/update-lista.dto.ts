import { IsOptional, IsString } from 'class-validator';

export class UpdateListaDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
