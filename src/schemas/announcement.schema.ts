import { z } from 'zod';
import { userSchema } from './user.schema';

export const announcementSchema = z.object({
  id: z.string(),
  brand: z.string().max(15),
  model: z.string().max(20),
  year: z.number().int().positive().max(4),
  fuel: z.string().max(15),
  mileage: z.number().int().positive().max(6),
  color: z.string().max(15),
  table_price: z
    .number()
    .positive()
    .default(() => 0)
    .or(z.string()),
  price: z
    .number()
    .positive()
    .default(() => 0)
    .or(z.string()),
  description: z.string().nullish(),
  user: userSchema,
});

export const announcementCreateSchema = announcementSchema.omit({
  id: true,
});
export const announcementUpdateSchema = announcementCreateSchema.partial();

// export const announcementReadSchema = announcementCreateSchema.array();
