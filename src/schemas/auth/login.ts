import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 symbol',
    ),
});
// tidak perlu kapital
export type LoginPayload = z.infer<typeof loginSchema>;
