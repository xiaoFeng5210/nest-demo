import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import {BoilOrders} from "./boil_orders.entity";

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
    return this.boilOrdersRepository.findOne(id);
  }
  
  findList(where: Partial<BoilOrders>, pagination?: {page: number, size: number}): Promise<BoilOrders[]> {
    const queryParams = {project_name: where.project_name ?? '', food_name: where.food_name ?? ''};
    if (!queryParams.food_name) {
      delete queryParams.food_name;
    }
    console.log(queryParams);
    console.log(pagination);
    return this.boilOrdersRepository.find({
      where: queryParams,
      skip: pagination.page ? pagination.page : 0,
      take: pagination.size ? pagination.size : 10
    });
  }
}
