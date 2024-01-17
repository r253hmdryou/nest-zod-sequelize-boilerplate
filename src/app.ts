import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';

import { AppModule } from './app.module';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, {
    logger: process.env.APP_LOGGER as unknown as false,
  });

  app.setGlobalPrefix('/v1');

  return app;
}
