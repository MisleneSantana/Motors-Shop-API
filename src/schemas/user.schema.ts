import { z } from 'zod';
import { userAddressCreateSchema } from './address.schema';

export const userSchema = z.object({
  id: z.string(),
  name: z.string().max(50),
  email: z.string().max(45).email(),
  cpf: z.string().length(11),
  phone_number: z.string().length(12),
  birth_date: z.string(),
  description: z.string().nullish(),
  account_type: z.string().max(15),
  password: z.string().max(120),
  address: userAddressCreateSchema,
});

export const userCreateSchema = userSchema.omit({
  id: true,
});

export const userReturnSchema = userSchema.omit({ password: true });
export const userReadSchema = userReturnSchema.array();
export const userUpdateSchema = userCreateSchema.partial();
