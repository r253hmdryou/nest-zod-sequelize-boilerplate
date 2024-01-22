import { UserModel } from 'share/models/user.model';
import { UserEntity } from './user.entity';

describe('UserEntity', () => {
  describe('factory()', () => {
    test('success', () => {
      const user = UserEntity.factory({
        email: 'test@example.com',
        passwordHash: 'hash',
      });

      expect(() => user.id).toThrow();
      expect(user.uuid).toHaveLength(36);
      expect(user.email).toEqual('test@example.com');
      expect(user.passwordHash).toEqual('hash');
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.isPersisted()).toEqual(false);

      expect((user._id = BigInt(1))).toEqual(BigInt(1));
    });
  });

  describe('fromModel()', () => {
    test('success', () => {
      const model = new UserModel({
        id: BigInt(1),
        uuid: 'bdd1040a-1ab7-41f9-9560-4ea0268ce84a',
        email: 'test@example.com',
        passwordHash: 'hash',
        createdAt: new Date(),
      });

      const user = UserEntity.fromModel(model);

      expect(user.id).toEqual(BigInt(1));
      expect(user.uuid).toEqual('bdd1040a-1ab7-41f9-9560-4ea0268ce84a');
      expect(user.email).toEqual('test@example.com');
      expect(user.passwordHash).toEqual('hash');
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.isPersisted()).toEqual(true);

      expect(() => (user._id = BigInt(2))).toThrow();
    });
  });

  describe('toModel()', () => {
    test('new record', () => {
      const user = UserEntity.factory({
        email: 'test@example.com',
        passwordHash: 'hash',
      });

      const model = user.toModel();

      expect(model.id).toEqual(null);
      expect(model.uuid).toEqual(user.uuid);
      expect(model.email).toEqual(user.email);
      expect(model.passwordHash).toEqual(user.passwordHash);
      expect(model.createdAt).toEqual(user.createdAt);
      expect(model.isNewRecord).toEqual(true);
    });

    test('not new record', () => {
      const user = UserEntity.fromModel(
        new UserModel({
          id: BigInt(1),
          uuid: 'bdd1040a-1ab7-41f9-9560-4ea0268ce84a',
          email: 'test@example.com',
          passwordHash: 'hash',
          createdAt: new Date(),
        }),
      );

      const model = user.toModel();

      expect(model.id).toEqual(BigInt(1));
      expect(model.uuid).toEqual(user.uuid);
      expect(model.email).toEqual(user.email);
      expect(model.passwordHash).toEqual(user.passwordHash);
      expect(model.createdAt).toEqual(user.createdAt);
      expect(model.isNewRecord).toEqual(false);
    });
  });
});
