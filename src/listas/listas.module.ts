import { Module } from '@nestjs/common';
import { ListasService } from './listas.service';
import { ListasController } from './listas.controller';
import { Lista } from './entities/lista.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';



@Module({
  imports: [TypeOrmModule.forFeature([Lista, User]),
  UsersModule,
  ],
  providers: [ListasService],
  controllers: [ListasController]
})

export class ListasModule {}
