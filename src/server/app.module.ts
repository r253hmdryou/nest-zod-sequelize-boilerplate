import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserRegistrationModule } from './user-registration/user-registration.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    UserRegistrationModule,
    SequelizeModule.forRoot({
      uri: process.env.RDB_URI,
      dialect: process.env.RDB_DIALECT as any,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
