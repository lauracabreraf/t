import { Module } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutentController } from './autenticacion.controller';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'claveSecreta',
      signOptions: { expiresIn: '2h' },
    }),
  ],

  providers: [AutenticacionService, JwtStrategy],
  controllers: [AutentController],
  exports: [AutenticacionService, PassportModule, JwtModule, JwtStrategy],
})
export class AutenticacionModule {}
