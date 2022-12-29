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
import { ConfigModule } from "@nestjs/config";

let envFilePath = ['.env'];
export const IS_DEV = process.env.RUNNING_ENV === 'dev';
if (IS_DEV) {
  envFilePath.unshift('.env.dev');
} else {
  envFilePath.unshift('.env.prod');
}

@Dependencies(DataSource)
@Module({
  imports: [CatsModule, ConfigModule.forRoot({
    isGlobal: true,
    envFilePath,
  }), TypeOrmModule.forRoot({ 
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User, BoilOrders],
    synchronize: false,
    logging: true,
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
