import { IsInt, IsArray, ArrayNotEmpty } from 'class-validator';

export class CompartirListaDto {
  @IsInt()
  listaId: number;

  @IsArray()
  @ArrayNotEmpty()
  usuariosIds: number[];
}
