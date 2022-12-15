import { Dependencies, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {LoggerMiddleware} from "./common/middleware/logger.middleware";
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {DataSource} from 'typeorm'
import { User } from './users/user.entity';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from "./users/user.module";

@Dependencies(DataSource)
@Module({
  imports: [CatsModule, TypeOrmModule.forRoot({ 
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'xiaofeng',
    password: 'f85859852',
    database: 'test',
    entities: [User],
    synchronize: true,
  }), UsersModule],
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
