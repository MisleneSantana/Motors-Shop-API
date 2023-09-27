import { z } from 'zod';
import { userAddressCreateSchema } from '../schemas/address.schema';
import { Repository } from 'typeorm';
import { Address } from '../entities';

export type TAddressCreate = z.infer<typeof userAddressCreateSchema>;
export type TAddressRepo = Repository<Address>;
