import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { BoilOrders } from "./boil_orders.entity";


@Injectable()
export class BoilOrdersService {
  constructor(
    @InjectRepository(BoilOrders)
    private boilOrdersRepository: Repository<BoilOrders>
  ) {}
  
  findAll(): Promise<BoilOrders[]> {
    return this.boilOrdersRepository.find();
  }
  
  findOne(id: number): Promise<BoilOrders> {
    // @ts-ignore
    return this.boilOrdersRepository.findOne({where: {id}});
  }
  
  findList(where: Partial<BoilOrders>, pagination?: {page: number, size: number}): Promise<BoilOrders[]> {
    if (where.status < 0) {
      return this.boilOrdersRepository.query(
        `select * from boil_orders where project_name = "${where.project_name}" order by id desc limit ${pagination.page}, ${pagination.size}`
      )
    } else {
      return this.boilOrdersRepository.query(
        `select * from boil_orders where project_name = "${where.project_name}" and status = ${where.status} order by id desc limit ${pagination.page}, ${pagination.size}`
      )
    }
    
  }
  
  getListCount(where: Partial<BoilOrders>): Promise<number> {
    const queryParams = {project_name: where.project_name ?? '', food_name: where.food_name ?? '', status: where.status >=0 ? where.status : -1}
    if (!queryParams.food_name) {
      delete queryParams.food_name;
    }
    if (queryParams.status < 0) {
      delete queryParams.status;
    }
    console.log(queryParams);
    return this.boilOrdersRepository.count({where: queryParams});
  }
  
  // 获取食品的分类
  getFoodCategory(where: Partial<BoilOrders>): Promise<any> {
    return this.boilOrdersRepository.query(
      `select food_name as name, count(*) as value from boil_orders where project_name = "${where.project_name}" group by food_name`
    )
  }
  
  // 获取今日食品的分类
  getFoodToday(where: {project_name: string, order_date: string}): Promise<any> {
    return this.boilOrdersRepository.query(
      `select food_name as name, count(*) as value from boil_orders where project_name = "${where.project_name}" and order_date = "${where.order_date}" group by food_name`
    )
  }
  
  // 获取当前数据所有公司
  getAllCompany(): Promise<any> {
    return this.boilOrdersRepository.query(
      `select DISTINCT project_name from boil_orders`
    )
  }
  
  // 根据参数来按月份查询订单量，对这些订单按天进行分组，然后每组里面再按照食品分类并统计条数
  getFoodByMonth(where: Partial<BoilOrders>): Promise<any> {
    return this.boilOrdersRepository.query(
      `select DATE_FORMAT(start_time, '%Y-%m') as month, DATE_FORMAT(start_time, '%d') as day, food_name as name, count(*) as value from boil_orders where project_name = "${where.project_name}" and start_time >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH) group by month, day, food_name`
    )
  }
  
  // 先根据月份参数查处所有的订单，然后根据order_date字段进行分组，这样就把数据按天分组了
  getFoodGroupByDay(where: {project_name: string, start_time: string, end_time: string}): Promise<any> {
    return this.boilOrdersRepository.query(
      `select order_date as day, count(*) as value from boil_orders where project_name = "${where.project_name}" and order_date between ${where.start_time} and ${where.end_time} group by order_date`
    )
  }
  
  // 按天分组后，传入order_date 和 project_name字段查询数据， 然后根据food_name字段进行分组，统计条数
  getDayFoodGroupByFoodName(where: {project_name: string, order_date: string}): Promise<any> {
    return this.boilOrdersRepository.query(
      `select food_name, count(*) as value from boil_orders where project_name = "${where.project_name}" and order_date = "${where.order_date}" group by food_name`
    )
  }
  
  // 查询公司和food_name字段的组合，然后根据order_date字段进行分组，统计条数
  getFoodGroupBy(where: {project_name: string, food_name: string}): Promise<any> {
    return this.boilOrdersRepository.query(
      `select food_name, count(*) as value, order_date as day from boil_orders where project_name = "${where.project_name}" and food_name = "${where.food_name}" group by order_date order by order_date`
    )
  }
  
}
