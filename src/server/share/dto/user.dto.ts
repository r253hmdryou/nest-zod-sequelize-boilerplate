import z from 'zod';

export const userSchema = z.object({
  id: z.bigint(),
  uuid: z.string().uuid(),
  email: z.string().email(),
  password: z.string(),
  // passwordHash: z.string(), dtoに乗せることはない
  createdAt: z.date(),
});
