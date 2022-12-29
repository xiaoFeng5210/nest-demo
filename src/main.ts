import { NestFactory } from '@nestjs/core';
import { AppModule, IS_DEV } from './app.module';
import {ResponseInterceptor} from "./core/interceptors/response.interceptor";
import {AllExceptionFilter} from "./core/filters/all-exception.filter";
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //   全局注册拦截器
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(process.env.PORT || 8081);
}
bootstrap();
