import { z } from 'zod';
import { userAddressCreateSchema, userAddressUpdateSchema } from './address.schema';
import { UserRole } from '../interfaces/user.interfaces';

export const userSchema = z.object({
  id: z.string(),
  name: z.string().max(50),
  email: z.string().max(45).email(),
  cpf: z.string().length(11),
  phone_number: z.string().length(12),
  birth_date: z.string(),
  description: z.string().nullish(),
  account_type: z.enum([UserRole.ANUNCIANTE, UserRole.COMPRADOR]).default(UserRole.COMPRADOR),
  password: z.string().max(120),
  reset_password: z.string().nullable(),
  code_expire: z.string().nullable(),
  createdAt: z.string().or(z.date()),
  address: userAddressCreateSchema,
});

export const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
  reset_password: true,
  code_expire: true,
});

export const userReturnSchema = z
  .object({
    id: z.string(),
    name: z.string().max(50),
    email: z.string().max(45).email(),
    cpf: z.string().length(11),
    phone_number: z.string().length(12),
    birth_date: z.string(),
    description: z.string().nullish(),
    account_type: z.string().max(15),
    password: z.string().max(120),
    createdAt: z.string().or(z.date()),
    address: userAddressUpdateSchema,
  })
  .omit({ password: true, reset_password: true, code_expire: true });
export const userReadSchema = userReturnSchema.array();
export const userUpdateSchema = userCreateSchema
  .partial()
  .omit({ cpf: true, account_type: true, reset_password: true, code_expire: true });
