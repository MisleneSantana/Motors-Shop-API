import { z } from 'zod';

export const imageSchema = z.object({
  id: z.string(),
  image_url: z.string().max(280),
});

export const imageCreateSchema = imageSchema.omit({ id: true });
export const imageReturnSchema = imageSchema.array();
export const imageUpdateSchema = imageCreateSchema.partial();
