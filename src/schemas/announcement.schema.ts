import { z } from 'zod';
import { imageCreateSchema } from './image.schema';

export const announcementSchema = z.object({
  id: z.string(),
  brand: z.string().max(15),
  model: z.string().max(20),
  year: z.number().int().positive(),
  fuel: z.string().max(15),
  km: z.number().int().positive(),
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
  createdAt: z.string().or(z.date()),
});

export const announcementCreateSchema = announcementSchema
  .extend({
    images: imageCreateSchema,
  })
  .omit({ id: true, createdAt: true });

export const announcementReturnSchema = announcementSchema.extend({
  images: z
    .object({
      id: z.string(),
      image_url: z.string().max(280),
    })
    .array(),
  user: z
    .object({
      id: z.string(),
      name: z.string().max(50),
      phone_number: z.string().length(12),
      description: z.string().nullish(),
    })
    .optional(),
});

export const announcementUpdateSchema = announcementCreateSchema.partial();

export const announcementReadSchema = announcementCreateSchema.array();
