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
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AutenticacionService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private  configService: ConfigService,
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
      id: user.id,
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
      id: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '2h',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '7d',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { refresh_token } = refreshTokenDto;

    try {
      const payload = await this.jwtService.verifyAsync(refresh_token, {
        secret: 'claveSecreta',
      });

      const newAccessToken = await this.jwtService.signAsync(
        {
          sub: payload.sub,
          email: payload.email,
        },
        {
          secret: 'claveSecreta',
          expiresIn: '2h',
        },
      );

      return {
        access_token: newAccessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }
}
