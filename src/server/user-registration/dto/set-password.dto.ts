import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const setPasswordDtoSchema = z.object({
  password: z.string(),
  token: z.string(),
});

export class SetPasswordDto extends createZodDto(setPasswordDtoSchema) {}
