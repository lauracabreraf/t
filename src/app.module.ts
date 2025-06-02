import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasModule } from './categorias/categorias.module';
import { UsersModule } from './users/users.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { TareasModule } from './tarea/tarea.module';



@Module({
  imports: [
    TypeOrmModule.forRoot ({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '201275ab',
      database: 'todolist',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TareasModule,
    CategoriasModule,
    UsersModule,
    AutenticacionModule,


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
