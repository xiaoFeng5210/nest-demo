import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { BoilOrdersService } from "./boil_orders.service";
import {BoilOrders} from "./boil_orders.entity";
import {Request} from 'express';

export interface GetListParams {
  query: {
    project_name: string,
    food_name: string
  }
  pagination?: {
    page: number,
    size: number
  }
}

@Controller('boil_orders')
export class BoilOrdersController {
  constructor(private boilOrdersService: BoilOrdersService) {}
  
  @Get(':id')
  async findOne(@Param() params): Promise<BoilOrders> {
    return this.boilOrdersService.findOne(params.id);
  }
  
  @Post('find')
  async find(@Body() boilOrders: GetListParams) {
    const {query, pagination} = boilOrders;
    return this.boilOrdersService.findList(query, pagination);
  }
  
}
