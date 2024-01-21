import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from 'share/filters/exception.filter';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, {
    logger: getLoggerOption(process.env.APP_LOGGER),
  });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.setGlobalPrefix('/v1');

  return app;
}

function getLoggerOption(env: string | undefined) {
  if (env === undefined) {
    return undefined;
  }
  if (env === 'false') {
    return false;
  }
  return undefined;
}
