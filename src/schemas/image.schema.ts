import { z } from 'zod';

export const imageSchema = z.object({
  id: z.number().int().positive(),
  image_url: z.string().max(280),
});
