import { Controller, Get, HttpStatus, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect("/user", HttpStatus.TEMPORARY_REDIRECT)
  getHello(): string {
    return this.appService.getHello();
  }


}
