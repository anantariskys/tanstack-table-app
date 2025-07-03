import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .min(6, 'Username must be at least 6 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 symbol',
    ),
});

export type LoginPayload = z.infer<typeof loginSchema>;
