import { Module } from '@nestjs/common';
import { UserRegistrationService } from './user-registration.service';
import { UserRegistrationController } from './user-registration.controller';
import { UserRegistrationRepository } from './user-registration.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'share/models/user.model';
import { BcryptModule } from 'vendors/bcrypt/bcrypt.module';

@Module({
  controllers: [UserRegistrationController],
  imports: [SequelizeModule.forFeature([UserModel]), BcryptModule],
  providers: [UserRegistrationService, UserRegistrationRepository],
})
export class UserRegistrationModule {}
