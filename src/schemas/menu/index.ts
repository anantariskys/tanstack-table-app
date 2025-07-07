import { z } from 'zod';
import { categorySchema } from '../categories';

export const menuSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  photoUrl: z.string(),
  price: z.number(),
  isAvailable: z.boolean(),
  categoryId: z.number(),
  restaurantId: z.number(),
  createdAt: z.string(),
  categories: categorySchema,
});

export const createMenuSchema = menuSchema
  .omit({
    id: true,
    createdAt: true,
    categories: true,
    photoUrl: true,
  })
  .extend({
    name: z.string().nonempty('Name is required'),
    description: z.string().min(1, 'Description is required').nonempty('Description is required'),
    price: z.number().min(1, 'Price is required'),
    isAvailable: z.boolean().optional(),
    categoryId: z.number().min(1, 'Category is required'),
    restaurantId: z.number().min(1, 'Restaurant is required'),
    photo: z
      .instanceof(File)
      .refine((file) => file && file.type.startsWith('image/'), 'File must be an image')
      .refine((file) => file && file.size <= 2 * 1024 * 1024, 'Photo size must be less than 2MB'),
  });

export type Menu = z.infer<typeof menuSchema>;
export type CreateMenuPayload = z.infer<typeof createMenuSchema>;
