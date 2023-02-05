import { Controller, Get, HttpStatus, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

// import { Req, Res } from "@nestjs/common";
// import { Request, Response } from "express";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect("/user", HttpStatus.TEMPORARY_REDIRECT)
  getHello(): string {
    return this.appService.getHello();
  }
  

  // getHelloRes(@Req() req: Request, @Res() res: Response): string {
  //   res.status(503).end("hehe");
  //   return this.appService.getHello();
  // }


}
