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
      'Registers a new user using their email address. The system sends an email containing a confirmation token to the user.',
  })
  @ApiOkResponse()
  async register(@Body() dto: UserRegistrationDto): Promise<void> {
    await this.service.create(dto.email);
    return;
  }

  @Post('confirm')
  @ApiOperation({
    operationId: 'confirmRegistrationToken',
    summary: 'Confirm a user with a token sent to the user by email (Optional)',
    description:
      "This endpoint is optional and is used to confirm a user's registration using a token sent by email. It only checks if the token is valid. However, this step can be bypassed as token validity is also confirmed during the password setting process.",
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
    description:
      'This endpoint allows the user to set a password for login. If the token is invalid, the user is prompted to re-register.',
  })
  @ApiOkResponse()
  async setPassword(@Body() dto: SetPasswordDto): Promise<void> {
    return await this.service.setPassword(dto.token, dto.password);
  }
}
