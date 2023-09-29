import { z } from 'zod';
import { imageCreateSchema, imageReturnSchema, imageSchema } from '../schemas/image.schema';
import { DeepPartial, Repository } from 'typeorm';
import { Image } from '../entities';

export type TImage = z.infer<typeof imageSchema>;
export type TImageCreate = z.infer<typeof imageCreateSchema>;
export type TImageReturn = z.infer<typeof imageReturnSchema>;
// export type TImageUpdate = DeepPartial<Image[]>;
export type TImageRepo = Repository<Image>;
