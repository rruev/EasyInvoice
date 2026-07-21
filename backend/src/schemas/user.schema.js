import * as z from 'zod';

export const userLogInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).trim().toLowerCase(),
  password: z.string(),
});