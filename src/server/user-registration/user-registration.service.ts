import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRegistrationRepository } from './user-registration.repository';
import { BcryptService } from 'vendors/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserRegistrationService {
  constructor(
    private readonly repository: UserRegistrationRepository,
    private bcrypt: BcryptService,
    private jwtService: JwtService,
  ) {}
  async create(email: string): Promise<void> {
    const token = this.issueToken(email);
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
    const email = payload.email;
    if (email === undefined || !(typeof email === 'string')) {
      throw new UnauthorizedException();
    }
    if (await this.repository.existsByEmail(email)) {
      throw new ConflictException();
    }
    const passwordHash = await this.bcrypt.hash(password, 10);

    const user = UserEntity.factory({
      email: email,
      passwordHash: passwordHash,
    });
    this.repository.save(user);
  }

  issueToken(email: string): string {
    return this.jwtService.sign({ email: email });
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
