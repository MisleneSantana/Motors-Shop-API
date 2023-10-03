import { NextFunction, Request, Response } from 'express';
import { compareUuid } from '../../utils/compareUuid.util';

export const validateTheUuidMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const userId: string = req.params.id;

  if (!compareUuid(userId)) {
    return res.status(400).json({ message: 'Invalid UUID' });
  }

  return next();
};
