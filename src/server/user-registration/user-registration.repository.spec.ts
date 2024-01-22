import { Test } from '@nestjs/testing';
import { UserRegistrationRepository } from './user-registration.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'share/models/user.model';
import { sequelize } from 'vendors/sequelize/sequelize';
import { UserEntity } from './entities/user.entity';

describe('UserRegistrationRepository', () => {
  let repository: UserRegistrationRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRoot({
          uri: process.env.RDB_URI,
          dialect: process.env.RDB_DIALECT as any,
          logging: () => {},
        }),
        SequelizeModule.forFeature([UserModel]),
      ],
      providers: [UserRegistrationRepository],
    }).compile();

    repository = module.get(UserRegistrationRepository);
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  describe('existsByEmail()', () => {
    test('exists', async () => {
      UserModel.create({
        uuid: 'bdd1040a-1ab7-41f9-9560-4ea0268ce84a',
        email: 'exists@example.com',
        passwordHash: 'hash',
        createdAt: new Date(),
      });

      const result = await repository.existsByEmail('exists@example.com');

      expect(result).toEqual(true);
    });

    test('not exists', async () => {
      const result = await repository.existsByEmail('not-exists@example.com');

      expect(result).toEqual(false);
    });
  });

  test('save()', async () => {
    const user = UserEntity.factory({
      email: 'test@example.com',
      passwordHash: 'hash',
    });

    await repository.save(user);

    const models = await UserModel.findAll();

    expect(models).toHaveLength(1);
    expect(models[0].uuid).toEqual(user.uuid);
    expect(models[0].email).toEqual(user.email);
    expect(models[0].passwordHash).toEqual(user.passwordHash);
    expect(models[0].createdAt).toEqual(user.createdAt);
  });
});
