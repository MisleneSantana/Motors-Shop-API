import { z } from 'zod';
import { imageCreateSchema } from './image.schema';

export const announcementSchema = z.object({
  id: z.string(),
  brand: z.string().max(15),
  model: z.string().max(20),
  year: z.string().max(4),
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
  announcement_is_active: z.boolean().default(true),
  createdAt: z.string().or(z.date()),
  deletedAt: z.string().or(z.date()).nullable(),
});

export const announcementCreateSchema = announcementSchema
  .extend({
    images: imageCreateSchema.array(),
  })
  .omit({ id: true, createdAt: true, deletedAt: true });

export const announcementReturnSchema = announcementSchema.extend({
  createdAt: z.string().or(z.date()),
  user: z
    .object({
      id: z.string(),
      name: z.string().max(50),
      phone_number: z.string().length(12),
      description: z.string().nullish(),
    })
    .optional(),
  images: z
    .object({
      id: z.string(),
      image_url: z.string().max(280),
    })
    .array(),
});

export const announcementUpdateSchema = announcementCreateSchema.partial();

export const announcementReadSchema = z
  .object({
    id: z.string(),
    createdAt: z.string().or(z.date()),
    announcement_is_active: z.boolean().default(false),
    brand: z.string().max(15),
    model: z.string().max(20),
    description: z.string().nullish(),
    km: z.number().int().positive(),
    year: z.string().max(4),
    price: z
      .number()
      .positive()
      .default(() => 0)
      .or(z.string()),
    user: z
      .object({
        id: z.string(),
        name: z.string().max(50),
      })
      .optional(),
    images: z
      .object({
        id: z.string(),
        image_url: z.string().max(280),
      })
      .array(),
  })
  .array();
