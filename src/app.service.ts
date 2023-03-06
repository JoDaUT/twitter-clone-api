import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    const hello = this.configService.get<string>('HOLA');
    console.log(hello);
    return 'Hello World!';
  }
}
