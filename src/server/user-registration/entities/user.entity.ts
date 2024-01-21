export class UserRegistration {}
import { Entity, PropertiesCore } from 'share/entities/Entity';
import { UserModel } from 'share/models/user.model';
import { v4 } from 'uuid';

interface PropertiesEssential {
  email: string;
  passwordHash: string;
}

interface Properties extends PropertiesCore, PropertiesEssential {
  uuid: string;
  createdAt: Date;
}

export class UserEntity extends Entity<Properties> {
  static factory(properties: PropertiesEssential): UserEntity {
    return new UserEntity({
      ...properties,
      uuid: v4(),
      createdAt: new Date(),
    });
  }

  static fromModel(model: UserModel): UserEntity {
    return new UserEntity({
      id: model.id,
      uuid: model.uuid,
      email: model.email,
      passwordHash: model.passwordHash,
      createdAt: model.createdAt,
    });
  }

  toModel(): UserModel {
    const model = new UserModel({
      id: this.properties.id,
      uuid: this.properties.uuid,
      email: this.properties.email,
      passwordHash: this.properties.passwordHash,
      createdAt: this.properties.createdAt,
    });
    model.isNewRecord = this.properties.id === undefined;
    return model;
  }

  get uuid(): string {
    return this.properties.uuid;
  }

  get email(): string {
    return this.properties.email;
  }

  get passwordHash(): string | null {
    return this.properties.passwordHash;
  }

  get createdAt(): Date {
    return this.properties.createdAt;
  }
}
