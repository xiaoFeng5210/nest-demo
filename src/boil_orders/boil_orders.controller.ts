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
  
  // @Get(':id')
  // async findOne(@Param() params): Promise<BoilOrders> {
  //   return this.boilOrdersService.findOne(Number(params.id));
  // }
  
  @Post('get_food_category_today')
  async getFoodToday(@Body() body: {project_name: string}) {
    return this.boilOrdersService.getFoodToday(body);
  }

  @Post('get_food_category')
  async getFoodCategory(@Body() body: {project_name: string}) {
    return this.boilOrdersService.getFoodCategory(body);
  }
  
  @Post('find')
  async find(@Body() boilOrders: GetListParams) {
    const {query, pagination} = boilOrders;
    return this.boilOrdersService.findList(query, pagination);
  }
  
  @Post('list_count')
  async getListCount(@Body() body: {food_name: string, project_name: string}) {
    return this.boilOrdersService.getListCount(body);
  }
  
  @Get('get_company')
  async getCompany() {
    return this.boilOrdersService.getAllCompany();
  }
}
