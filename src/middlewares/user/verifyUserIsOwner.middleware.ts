import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../errors/error';

export const verifyUserIsOwnerMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const { sub } = res.locals.decoded;

  if (id != sub) {
    throw new AppError('Insufficient permission', 403);
  }
  return next();
};
