import { Module } from '@nestjs/common';
import { FtpService } from './ftp.service';
import { FtpController } from './ftp.controller';

@Module({
  providers: [FtpService],
  controllers: [FtpController],
  exports: [FtpService], 
})
export class FtpModule {}
