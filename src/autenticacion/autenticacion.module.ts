import { Module } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AutenticacionController } from './auth.controller';




@Module({
   imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'claveSecreta', 
      signOptions: { expiresIn: '1h' },
    }),
  ],

  providers: [AutenticacionService],
  controllers: [AutenticacionController],
  exports: [AutenticacionService], 
})
export class AutenticacionModule {}
