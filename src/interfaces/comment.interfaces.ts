import { z } from 'zod';
import { commentCreateSchema, commentReturnSchema, commentSchema, commentReadSchema } from '../schemas/comment';
import { DeepPartial, Repository } from 'typeorm';

export type TComment = z.infer<typeof commentSchema>;
export type TCommentCreate = z.infer<typeof commentCreateSchema>;
export type TCommentReturn = z.infer<typeof commentReturnSchema>;
export type TCommentRead = z.infer<typeof commentReadSchema>;
export type TCommentUpdate = DeepPartial<Comment>;
export type TCommentRepo = Repository<Comment>;
