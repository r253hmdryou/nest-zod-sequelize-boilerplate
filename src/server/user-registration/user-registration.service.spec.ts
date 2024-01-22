import { Test, TestingModule } from '@nestjs/testing';
import { UserRegistrationService } from './user-registration.service';
import { UserRegistrationRepository } from './user-registration.repository';
import { BcryptModule } from 'vendors/bcrypt/bcrypt.module';
import { JwtModule } from '@nestjs/jwt';
import mockDate from '@libs/date';
import { UserEntity } from './entities/user.entity';

class UserRegistrationRepositoryMock {
  async save() {}

  async existsByEmail(email: string) {
    if (email === 'exists@example.com') {
      return true;
    }
    return false;
  }
}

describe('service', () => {
  let service: UserRegistrationService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRegistrationService,
        {
          provide: UserRegistrationRepository,
          useClass: UserRegistrationRepositoryMock,
        },
      ],
      imports: [
        BcryptModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1d' },
        }),
      ],
    }).compile();

    service = module.get(UserRegistrationService);
  });

  test('create()', async () => {
    const email = 'test@example.com';
    const result = await service.create(email);

    expect(result).toEqual(undefined);
  });

  describe('confirm()', () => {
    test('success', async () => {
      const email = 'test@example.com';
      const token = service.issueToken(email);
      const result = await service.confirm(token);

      expect(result).toEqual({ message: 'confirmed', email: email });
    });

    test('expired token', async () => {
      let token = '';
      await mockDate('2024-01-01T12:00:00.000+09:00', async () => {
        const email = 'test@example.com';
        token = service.issueToken(email);
      });
      await mockDate('2024-01-02T11:59:59.999+09:00', async () => {
        const result = await service.confirm(token);
        expect(result).toEqual({
          message: 'confirmed',
          email: 'test@example.com',
        });
      });
      await mockDate('2024-01-02T12:00:00.000+09:00', async () => {
        expect(service.confirm(token)).rejects.toThrow();
      });
    });

    test('invalid token', async () => {
      expect(service.confirm('invalid_token')).rejects.toThrow();
    });
  });

  describe('setPassword()', () => {
    test('success', async () => {
      const password = 'validPassword';
      const email = 'test@example.com';
      const token = service.issueToken(email);

      const result = await service.setPassword(token, password);

      expect(result).toBeUndefined();
    });

    test('already registered', async () => {
      const password = 'validPassword';
      const email = 'exists@example.com';
      const token = service.issueToken(email);

      expect(service.setPassword(token, password)).rejects.toThrow();
    });

    test('invalid token', async () => {
      const password = 'validPassword';
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub3RfZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNzA0MDc4MDAwLCJleHAiOjE3MDQxNjQ0MDB9.PbYX8t_4JdSj8ocNN2dou1WZyOR2D0Ri_agcrw935ng';
      await mockDate('2024-01-01T12:00:00.000+09:00', async () => {
        expect(service.setPassword(token, password)).rejects.toThrow();

        // token自体は正しいのでverifyToken()は成功する
        const payload = service.verifyToken(token);
        expect(payload).toEqual({
          not_email: 'test@example.com',
          exp: 1704164400,
          iat: 1704078000,
        });
      });
    });
  });

  it('issueToken()', () => {
    const email = 'test@example.com';
    const result = service.issueToken(email);

    expect(result).toMatch(/^eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9./);
  });
});
