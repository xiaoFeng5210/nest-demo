import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ResponseInterceptor} from "./core/interceptors/response.interceptor";
import {AllExceptionFilter} from "./core/filters/all-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //   全局注册拦截器
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(8081);
}
bootstrap();
