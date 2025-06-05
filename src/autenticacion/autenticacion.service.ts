import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { RegisterAutentDto } from './dto/registro-autenticacion.dto';
import { JwtPayload } from './interfaces/autenticacion-interface';
import { LoginAutentDto } from './dto/login-autenticacion.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AutenticacionService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registrar(userData: RegisterAutentDto) {
    const existingUser = await this.usersService.findByEmail(userData.email);

    if (existingUser) {
      throw new BadRequestException('El correo electrónico ya está en uso');
    }
    const hashedpassword = await bcrypt.hash(userData.password, 10);

    const user = await this.usersService.create({
      ...userData,
      password: hashedpassword,
    });

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    return {
      status: 200,
      message: 'Usuario registrado correctamente',
      data: payload,
    };
  }

  async login(loginData: LoginAutentDto) {
    const user = await this.usersService.findByEmail(loginData.email);

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(
      loginData.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
