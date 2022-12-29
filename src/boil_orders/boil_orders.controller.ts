import { Body, Controller, Get, Post } from "@nestjs/common";
import { BoilOrdersService } from "./boil_orders.service";

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

  @Get('get_company')
  async getCompany() {
    return this.boilOrdersService.getAllCompany();
  }
  
  @Post('get_food_category_today')
  async getFoodToday(@Body() body: {project_name: string, order_date: string}) {
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
  
  @Post('everyday')
  async getEveryday(@Body() body: {project_name: string, start_time: string, end_time: string}) {
    const res1 = await this.boilOrdersService.getFoodGroupByDay(body);
    console.log(res1)
    for (let item of res1) {
      item.foods = await this.boilOrdersService.getDayFoodGroupByFoodName({
        project_name: body.project_name,
        order_date: item.day
      });
    }
    return res1
  }
}
