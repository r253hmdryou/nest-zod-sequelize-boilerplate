import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserRegistrationModule } from './user-registration/user-registration.module';

@Module({
  imports: [UserRegistrationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
