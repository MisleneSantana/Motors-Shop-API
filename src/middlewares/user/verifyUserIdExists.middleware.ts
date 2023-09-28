import { NextFunction, Request, Response } from 'express';
import { User } from '../../entities';
import { userRepo } from '../../repositories';
import { AppError } from '../../errors/error';

export const verifyUserIdExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId: string = req.params.id;
  const userFound: User | null = await userRepo.findOneBy({ id: userId });

  if (!userFound) throw new AppError('User not found', 404);

  // Armazenando o user encontrado no locals como userFound:
  res.locals = { ...res.locals, userFound };

  return next();
};
