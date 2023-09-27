import { NextFunction, Request, Response } from 'express';
import { userRepo } from '../../repositories';
import { AppError } from '../../errors/error';

export const verifyCpfExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userCpf: string = req.body.cpf;
  if (!userCpf) {
    return next();
  }

  const user = await userRepo.findOneBy({ cpf: userCpf });
  if (user) {
    throw new AppError('CPF already registered', 409);
  }

  return next();
};
