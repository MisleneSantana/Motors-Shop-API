import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../../errors/error';

export const verifyAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization: string | undefined = req.headers.authorization;

  if (!authorization) throw new AppError('Missing bearer token', 401);

  const token = authorization?.split(' ')[1];

  if (token === undefined) {
    throw new AppError('Missing bearer token', 401);
  }

  verify(token, String(process.env.SECRET_KEY), (error: any, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    res.locals.userId = decoded.sub;
  });

  return next();
};
