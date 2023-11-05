import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('login')
  // getHello(): string {
  //   return this.appService.getHello();
  // }


  @Get('app')
  getLogin(): string {
    return this.appService.getLogin();
  }
}
