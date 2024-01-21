import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRegistrationRepository } from './user-registration.repository';
import { BcryptService } from 'vendors/bcrypt/bcrypt.service';

@Injectable()
export class UserRegistrationService {
  constructor(
    private readonly repository: UserRegistrationRepository,
    private bcrypt: BcryptService,
  ) {}
  async create(email: string): Promise<void> {
    // TODO: generate JWT and send email with confirmation link
    console.log(`send email to ${email} with confirmation link`);
    return;
  }

  async confirm(token: string): Promise<{ message: string }> {
    // TODO: validate JWT
    if (token === 'invalid') {
      throw new UnauthorizedException();
    }
    return { message: 'confirmed' };
  }

  async setPassword(token: string, password: string): Promise<void> {
    // TODO: validate JWT
    const email = token;
    const passwordHash = await this.bcrypt.hash(password, 10);

    // TODO: factory method
    const user = {
      email,
      passwordHash,
    };
    this.repository.save(user);
  }
}
