import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const tokenConfirmationDtoSchema = z.object({
  token: z.string(),
});

export class TokenConfirmationDto extends createZodDto(
  tokenConfirmationDtoSchema,
) {}

// response
const tokenConfirmationResponseDtoSchema = z.object({
  message: z.string(),
});

export class TokenConfirmationResponseDto extends createZodDto(
  tokenConfirmationResponseDtoSchema,
) {}
