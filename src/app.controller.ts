import { Controller, Get, Res, All, Redirect } from "@nestjs/common";
import { AppService } from './app.service';
import { Response } from 'express';
import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @All('echarts')
  getEchartsPage(@Res() res: Response): any {
    res.sendFile(
      path.join(__dirname, '../public', 'index.html'),);
  }
  
  @All('table')
  getTablePage(@Res() res: Response): any {
    res.sendFile(
      path.join(__dirname, '../public', 'index.html'),);
  }
}
