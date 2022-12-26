import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoilOrdersController } from './boil_orders.controller';
import { BoilOrdersService } from './boil_orders.service';
import { BoilOrders } from './boil_orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoilOrders])],
  providers: [BoilOrdersService],
  controllers: [BoilOrdersController],
})
export class BoilOrdersModule {}
