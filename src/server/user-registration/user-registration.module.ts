import { Module } from '@nestjs/common';
import { UserRegistrationService } from './user-registration.service';
import { UserRegistrationController } from './user-registration.controller';
import { UserRegistrationRepository } from './user-registration.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'share/models/user.model';
import { BcryptModule } from 'vendors/bcrypt/bcrypt.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserRegistrationController],
  imports: [
    SequelizeModule.forFeature([UserModel]),
    BcryptModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [UserRegistrationService, UserRegistrationRepository],
})
export class UserRegistrationModule {}
