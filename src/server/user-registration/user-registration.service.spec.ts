import { Test, TestingModule } from '@nestjs/testing';
import { UserRegistrationService } from './user-registration.service';
import { UserRegistrationRepository } from './user-registration.repository';
import { BcryptModule } from 'vendors/bcrypt/bcrypt.module';
import { JwtModule } from '@nestjs/jwt';

describe('UserRegistrationService', () => {
  let service: UserRegistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRegistrationService,
        {
          provide: UserRegistrationRepository,
          useValue: {},
        },
      ],
      imports: [BcryptModule, JwtModule],
    }).compile();

    service = module.get<UserRegistrationService>(UserRegistrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
