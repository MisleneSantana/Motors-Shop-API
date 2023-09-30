import { z } from 'zod';
import { announcementSchema } from './announcement.schema';

export const commentSchema = z.object({
  id: z.string(),
  comment: z.string(),
  createdAt: z.string().or(z.date()),
});

export const commentCreateSchema = commentSchema.pick({
  comment: true,
});

export const commentReturnSchema = commentSchema.extend({
  announcement: announcementSchema,
  user: z.object({
    id: z.string(),
    name: z.string().max(50),
    email: z.string().max(45).email(),
    account_type: z.string().max(15),
  }),
});

export const commentReadSchema = commentReturnSchema.array();
