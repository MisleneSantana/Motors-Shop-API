import { NextFunction, Request, Response } from 'express';
import { userRepo } from '../../repositories';
import { AppError } from '../../errors/error';

export const verifyUserEmailExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userEmail: string = req.body.email;
  if (!userEmail) {
    return next();
  }

  const foundUserEmail = await userRepo.findOneBy({ email: userEmail });
  if (foundUserEmail) {
    throw new AppError('Email already registered', 409);
  }

  return next();
};
