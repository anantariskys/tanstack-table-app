import z from 'zod';

export const storagesSchema = z.object({
  url: z.string(),
});

export const createStoragesSchema = z.object({
  photo: z
    .instanceof(File)
    .refine((file) => file && file.type.startsWith('image/'), 'File must be an image')
    .refine((file) => file && file.size <= 2 * 1024 * 1024, 'Photo size must be less than 2MB'),
});

export type Storages = z.infer<typeof storagesSchema>;
export type CreateStoragesPayload = z.infer<typeof createStoragesSchema>;
