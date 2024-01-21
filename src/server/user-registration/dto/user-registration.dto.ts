import { createZodDto } from 'nestjs-zod';
import { userSchema } from 'share/dto/user.dto';

const userRegistrationDtoSchema = userSchema.pick({
  email: true,
});

export class UserRegistrationDto extends createZodDto(
  userRegistrationDtoSchema,
) {}
