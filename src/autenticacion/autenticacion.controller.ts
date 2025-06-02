import { Controller, Post, Body } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { RegisterAutentDto } from './dto/registro-autenticacion.dto';
import { LoginAutentDto } from './dto/login-autenticacion.dto';

@Controller('autent')
export class AutenticacionController {
    constructor(private readonly autentService: AutenticacionService) {}

    @Post('registro')
    async registrar(@Body() userData: RegisterAutentDto) {
        return this.autentService.registrar(userData);
    }

    @Post('login')
    async login(@Body() loginData: LoginAutentDto) {
    return this.autentService.login(loginData);
  }


    
}
