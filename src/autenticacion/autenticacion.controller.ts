import { Controller, Post, Body } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { RegisterAutentDto } from './dto/registro-autenticacion.dto';
import { LoginAutentDto } from './dto/login-autenticacion.dto';

import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AutentController {
  constructor(private readonly autentService: AutenticacionService) {}

  @Post('registrar')
  async registrar(@Body() userData: RegisterAutentDto) {
    return this.autentService.registrar(userData);
  }

  @Post('login')
  async login(@Body() loginData: LoginAutentDto) {
    return this.autentService.login(loginData);
  }

  @Post('refresh')
  async refresh(@Body() refreshDto: RefreshTokenDto) {
    return this.autentService.refreshToken(refreshDto);
  }
}
