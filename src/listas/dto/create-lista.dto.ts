import { IsOptional, IsString } from "class-validator";


export class CreateListaDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

