import { NestFactory } from '@nestjs/core';
import { AppModule, IS_DEV } from './app.module';
import {ResponseInterceptor} from "./core/interceptors/response.interceptor";
import {AllExceptionFilter} from "./core/filters/all-exception.filter";
import * as process from "process";
import { NestExpressApplication } from '@nestjs/platform-express';
import {NotFoundExceptionFilter} from "./core/filters/notFoundExceptionFilter";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //   全局注册拦截器
  app.useGlobalFilters(new AllExceptionFilter());
  // app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useStaticAssets('public');
  await app.listen(process.env.PORT || 8081);
}
bootstrap().then(r => {});
