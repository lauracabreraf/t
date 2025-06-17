import { Injectable } from '@nestjs/common';
import * as Client from 'ssh2-sftp-client';

@Injectable()
export class FtpService {
    
  async conectar(): Promise<Client> {
    const client = new Client();

    await client.connect({
      host: process.env.FTP_HOST,
      port: Number(process.env.FTP_PORT) || 22,
      username: process.env.FTP_USER || 'user',
      password: process.env.FTP_PASSWORD,
    });

    return client; 
  }
}
