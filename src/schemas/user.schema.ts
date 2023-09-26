import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().max(50),
  email: z.string().max(45).email(),
  cpf: z.number().int().positive().max(11),
  phone_number: z.number().int().positive(),
  birth_date: z.string(),
  description: z.string().nullable().nullish(),
  account_type: z.string().max(15),
  password: z.string().max(120),
});

export const userCreateSchema = userSchema.omit({
  id: true,
});

export const userReturnSchema = userSchema.omit({ password: true });

export const userReadSchema = userReturnSchema.array();

// export const userUpdateSchema = userCreateSchema.omit({}).partial();
