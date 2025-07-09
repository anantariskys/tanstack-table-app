import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  createdAt: z.string().datetime(),
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['owner', 'manager', 'staff']),
});

export const createUserSchema = userSchema
  .omit({
    id: true,
    createdAt: true,
  })
  .extend({
    name: z.string().min(1, 'Name is required'),
    restaurantId: z.number().min(1, 'Restaurant ID is required'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(
        /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/,
        'Password must contain at least 1 number and 1 symbol',
      ),
  });

export const updateUserSchema = createUserSchema.extend({
  id: z.number(),
});

export type User = z.infer<typeof userSchema>;
export type CreateUserPayload = z.infer<typeof createUserSchema>;
export type UpdateUserPayload = z.infer<typeof updateUserSchema>;
