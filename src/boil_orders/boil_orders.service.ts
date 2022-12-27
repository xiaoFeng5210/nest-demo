import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import {BoilOrders} from "./boil_orders.entity";
import { DataSource } from "typeorm"


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
    const queryParams = {project_name: where.project_name ?? ''};
    console.log(queryParams);
    console.log(pagination);
    return this.boilOrdersRepository.find({
      where: queryParams,
      skip: pagination.page ? pagination.page : 0,
      take: pagination.size ? pagination.size : 10,
      order: {
        id: "DESC",
      },
    });
  }
  
  getListCount(where: Partial<BoilOrders>): Promise<number> {
    const queryParams = {project_name: where.project_name ?? '', food_name: where.food_name ?? ''};
    if (!queryParams.food_name) {
      delete queryParams.food_name;
    }
    console.log(queryParams);
    return this.boilOrdersRepository.count({where: queryParams});
  }
  
  // 获取食品的分类
  getFoodCategory(where: Partial<BoilOrders>): Promise<any> {
    // return this.boilOrdersRepository.createQueryBuilder('boil_orders')
    //   .where('boil_orders.project_name = :project_name', {project_name: where.project_name})
    //   .groupBy('boil_orders.food_name').printSql().getMany();
    // return this.boilOrdersRepository.query(
    //   `SELECT DISTINCT \`boil_orders\`.\`food_name\` AS \`food_name\` FROM \`boil_orders\` \`boil_orders\` WHERE \`boil_orders\`.\`project_name\` = "${where.project_name}"`
    // )
    return this.boilOrdersRepository.query(
      `select food_name as name, count(*) as value from boil_orders where project_name = "${where.project_name}" group by food_name`
    )
  }
  
  // 获取今日食品的分类
  getFoodToday(where: Partial<BoilOrders>): Promise<any> {
    return this.boilOrdersRepository.query(
      `select food_name as name, count(*) as value from boil_orders where project_name = "${where.project_name}" and start_time >= CURDATE() group by food_name`
    )
  }
  
  // 获取当前数据所有公司
  getAllCompany(): Promise<any> {
    return this.boilOrdersRepository.query(
      `select DISTINCT project_name from boil_orders`
    )
  }
}
