import { z } from 'zod';

export const userAddressSchema = z.object({
  id: z.string(),
  zip_code: z.string().max(8),
  state: z.string().max(2),
  city: z.string().max(20),
  street: z.string().max(45),
  number: z.string().max(7),
  complement: z.string().max(25).nullish(),
});

export const userAddressCreateSchema = userAddressSchema.omit({
  id: true,
});
