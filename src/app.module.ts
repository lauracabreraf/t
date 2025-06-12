import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListasModule } from './listas/listas.module';
import { UsersModule } from './users/users.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { TareasModule } from './tarea/tarea.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SubtareaModule } from './subtarea/subtarea.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: false,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TareasModule,
    ListasModule,
    UsersModule,
    AutenticacionModule,
    SubtareaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
