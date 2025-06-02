import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { Category } from './entities/categoria.entity';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoriasService],
  controllers: [CategoriasController]
})

export class CategoriasModule {}
