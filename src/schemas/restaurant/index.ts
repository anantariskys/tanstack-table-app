import z from 'zod';

const restaurantSchema = z.object({
  id: z.number(),
  createdAt: z.string().datetime(),
  name: z.string(),
  address: z.string(),
  description: z.string(),
  phone: z.string(),
});

export type Restaurant = z.infer<typeof restaurantSchema>;
