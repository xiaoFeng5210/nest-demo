import { Dependencies, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {LoggerMiddleware} from "./common/middleware/logger.middleware";
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {DataSource} from 'typeorm'
import { User } from './users/user.entity';
import { BoilOrders } from './boil_orders/boil_orders.entity';
import { UsersModule } from "./users/user.module";
import { BoilOrdersModule } from "./boil_orders/boil_orders.module";

@Dependencies(DataSource)
@Module({
  imports: [CatsModule, TypeOrmModule.forRoot({ 
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'xiaofeng',
    password: 'f85859852',
    database: 'test',
    entities: [User, BoilOrders],
    synchronize: false,
  }), UsersModule, BoilOrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  dataSource: DataSource;
  constructor(dataSource) {
    this.dataSource = dataSource;
  }
  configure(consumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
