import { Controller, Post, Body } from '@nestjs/common';
import { UserRegistrationService } from './user-registration.service';
import { UserRegistrationDto } from './dto/user-registration.dto';
import {
  TokenConfirmationDto,
  TokenConfirmationResponseDto,
} from './dto/confirm-token.dto';
import { SetPasswordDto } from './dto/set-password.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('registration')
export class UserRegistrationController {
  constructor(private readonly service: UserRegistrationService) {}

  @Post('register')
  @ApiOperation({
    operationId: 'registerUserRequest',
    summary: 'Register a new user with email address',
    description:
      'Register a new user with email address.system will send a confirmation email to the user.',
  })
  @ApiOkResponse()
  async register(@Body() dto: UserRegistrationDto): Promise<void> {
    await this.service.create(dto.email);
    return;
  }

  @Post('confirm')
  @ApiOperation({
    operationId: 'confirmRegistrationToken',
    summary: 'Confirm a user with a token sent to the user by email',
    description:
      'Confirm a user with a token sent to the user by email.notice: it only checks the token is valid or not. if you want to set a password to login, use /users/password endpoint.',
  })
  @ApiOkResponse({ type: TokenConfirmationResponseDto })
  async confirm(
    @Body() dto: TokenConfirmationDto,
  ): Promise<TokenConfirmationResponseDto> {
    return await this.service.confirm(dto.token);
  }

  @Post('password')
  @ApiOperation({
    operationId: 'setPassword',
    summary: 'Set a password to login',
    description: 'Set a password to login.',
  })
  @ApiOkResponse()
  async setPassword(@Body() dto: SetPasswordDto): Promise<void> {
    return await this.service.setPassword(dto.token, dto.password);
  }
}
