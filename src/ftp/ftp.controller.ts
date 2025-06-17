import { Controller, Get } from '@nestjs/common';
import { FtpService } from './ftp.service';


@Controller('ftp')
export class FtpController {
  constructor(private readonly ftpService: FtpService) {}

  @Get('conectar')
  async conectar(){
    await this.ftpService.conectar();
    return {message:'Conexion ftp '};
  }


  


}
