import { z } from 'zod';

export const registerSchema = z.object({
  username: z
    .string()
    .min(6, 'Username must be at least 6 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(
      /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/,
      'Password must contain at least 1 number and 1 symbol',
    ),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  name: z
    .string()
    .min(3, 'Full name must be at least 3 characters')
    .max(50, 'Full name must not exceed 50 characters'),
});

export type RegisterPayload = z.infer<typeof registerSchema>;
