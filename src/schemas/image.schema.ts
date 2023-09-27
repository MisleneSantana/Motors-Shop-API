import { z } from 'zod';

export const imageSchema = z.object({
  id: z.string(),
  image_url: z.string().max(280),
});
