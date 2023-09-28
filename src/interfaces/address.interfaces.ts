import { z } from 'zod';
import { userAddressCreateSchema, userAddressReturnSchema } from '../schemas/address.schema';
import { DeepPartial, Repository } from 'typeorm';
import { Address } from '../entities';

export type TAddressCreate = z.infer<typeof userAddressCreateSchema>;
export type TAddressReturn = z.infer<typeof userAddressReturnSchema>;
export type TAddressUpdate = DeepPartial<Address>;
export type TAddressRepo = Repository<Address>;
