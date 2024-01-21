import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from 'share/filters/exception.filter';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, {
    logger: getLoggerOption(),
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.setGlobalPrefix('/v1');

  return app;
}

function getLoggerOption() {
  const env = process.env.APP_LOGGER;
  if (env === undefined) {
    return undefined;
  }
  if (env === 'false') {
    return false;
  }
  return undefined;
}
