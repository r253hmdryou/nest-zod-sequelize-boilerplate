import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRegistrationRepository } from './user-registration.repository';
import { BcryptService } from 'vendors/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserRegistrationService {
  constructor(
    private readonly repository: UserRegistrationRepository,
    private bcrypt: BcryptService,
    private jwtService: JwtService,
  ) {}
  async create(email: string): Promise<void> {
    const token = await this.jwtService.signAsync({
      email: email,
    });
    // TODO: send email with confirmation link
    console.log(`send email to ${email} with confirmation link`);
    console.log(token);
    return;
  }

  async confirm(token: string): Promise<{ message: string; email: string }> {
    const payload = this.verifyToken(token);
    return { message: 'confirmed', email: payload.email };
  }

  async setPassword(token: string, password: string): Promise<void> {
    const payload = this.verifyToken(token);
    const passwordHash = await this.bcrypt.hash(password, 10);

    // TODO: factory method
    const user = {
      email: payload.email,
      passwordHash,
    };
    this.repository.save(user);
  }

  private verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
