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

@Dependencies(DataSource)
@Module({
  imports: [CatsModule, TypeOrmModule.forRoot({ 
    type: 'mysql',
    host: 'localhost',
    port: 8081,
    username: 'root',
    password: 'root',
    database: 'test',
    entities: [User],
    synchronize: true,
  })],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
