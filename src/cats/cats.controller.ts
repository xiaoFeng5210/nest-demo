import { Controller, Get, Req, Post, Header, Param, Body, UseInterceptors } from '@nestjs/common';
import {Request} from 'express';
import {Cat, CatsService} from './cats.service'
import {LoggingInterceptor} from './logging.interceptor'


@Controller('cats')
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}
  
  @Get('all')
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
  
  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
  
  @Post()
  // @Header('Cache-Control', 'none')
  async create(@Body() createCatDto) {
    this.catsService.create(createCatDto);
  }
}
