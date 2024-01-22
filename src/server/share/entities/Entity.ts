import { InternalServerErrorException } from '@nestjs/common';

export interface PropertiesCore {
  id?: bigint;
}

export abstract class Entity<T extends PropertiesCore> {
  properties: T;
  protected constructor(properties: T) {
    this.properties = properties;
  }

  isPersisted(): boolean {
    return this.properties.id !== undefined;
  }

  protected getOptionalProperty<T>(property: T | undefined): T {
    if (property === undefined) {
      throw new InternalServerErrorException('property is undefined');
    }
    return property;
  }

  set _id(id: bigint) {
    if (this.properties.id !== undefined) {
      throw new Error('id is already set');
    }
    this.properties.id = id;
  }

  get id(): bigint {
    return this.getOptionalProperty(this.properties.id);
  }
}
