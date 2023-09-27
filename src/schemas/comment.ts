import { z } from 'zod';

export const commentSchema = z.object({
  id: z.string(),
  comment: z.string().nullish(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
});

export const commentCreateSchema = commentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
