import { Controller, Post, Body } from '@nestjs/common';
import { UserRegistrationService } from './user-registration.service';
import { UserRegistrationDto } from './dto/user-registration.dto';
import {
  TokenConfirmationDto,
  TokenConfirmationResponseDto,
} from './dto/confirm-token.dto';
import { SetPasswordDto } from './dto/set-password.dto';

@Controller('users')
export class UserRegistrationController {
  constructor(private readonly service: UserRegistrationService) {}

  @Post('register')
  async register(@Body() dto: UserRegistrationDto): Promise<void> {
    await this.service.create(dto.email);
    return;
  }

  @Post('confirm')
  async confirm(
    @Body() dto: TokenConfirmationDto,
  ): Promise<TokenConfirmationResponseDto> {
    return await this.service.confirm(dto.token);
  }

  @Post('password')
  async setPassword(@Body() dto: SetPasswordDto): Promise<void> {
    return await this.service.setPassword(dto.token, dto.password);
  }
}
