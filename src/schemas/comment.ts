import { z } from 'zod';

export const commentSchema = z.object({
  id: z.number().int().positive(),
  comment: z.string().nullable().nullish(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const commentCreateSchema = commentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
