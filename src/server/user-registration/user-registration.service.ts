import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRegistrationRepository } from './user-registration.repository';

@Injectable()
export class UserRegistrationService {
  constructor(private readonly repository: UserRegistrationRepository) {}
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
    // TODO: hash password
    const passwordHash = password;

    // TODO: factory method
    const user = {
      email,
      passwordHash,
    };
    this.repository.save(user);
  }
}
