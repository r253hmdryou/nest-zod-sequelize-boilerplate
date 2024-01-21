import { Module } from '@nestjs/common';
import { UserRegistrationService } from './user-registration.service';
import { UserRegistrationController } from './user-registration.controller';

@Module({
  controllers: [UserRegistrationController],
  providers: [UserRegistrationService],
})
export class UserRegistrationModule {}
