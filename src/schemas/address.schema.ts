import { z } from 'zod';

export const userAddressSchema = z.object({
  id: z.string(),
  cep: z.string().length(8),
  state: z.string().length(2),
  city: z.string().max(20),
  street: z.string().max(45),
  number: z.string().max(7),
  complement: z.string().max(25).nullish().default(null),
});

export const userAddressCreateSchema = userAddressSchema.omit({
  id: true,
});

export const userAddressReturnSchema = userAddressSchema;

export const userAddressUpdateSchema = userAddressCreateSchema.partial();
