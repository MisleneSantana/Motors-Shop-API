import { Request, Response } from 'express';
import { readUserLoggedService } from '../../services/users/readUserLogged.service';
import { TUserReturn } from '../../interfaces/user.interfaces';

export const readUserLoggedController = async (req: Request, res: Response): Promise<Response> => {
  const userId: string = res.locals.userId;

  const user: TUserReturn = await readUserLoggedService(userId);
  return res.status(200).json(user);
};
