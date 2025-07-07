import { z } from 'zod';

export const categorySchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  createdAt: z.string(),
});

export const updateCategorySchema = categorySchema.pick({
  name: true,
});

export const createCategorySchema = categorySchema
  .omit({
    id: true,
    createdAt: true,
  })
  .extend({
    restaurantId: z.number().min(1, 'Restaurant is required'),
  });

export const deleteCategorySchema = categorySchema.pick({
  id: true,
});

export type Category = z.infer<typeof categorySchema>;
export type UpdateCategoryPayload = z.infer<typeof updateCategorySchema>;
export type CreateCategoryPayload = z.infer<typeof createCategorySchema>;
export type DeleteCategoryPayload = z.infer<typeof deleteCategorySchema>;
