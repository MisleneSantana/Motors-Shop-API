import { Request, Response } from 'express';
import { TUserReturn } from '../../interfaces/user.interfaces';
import { readUserByIdService } from '../../services/users/readUserById.service';

export const readUserByIdController = async (req: Request, res: Response): Promise<Response> => {
  const userId: string = res.locals.userFound.id;

  const user: TUserReturn = await readUserByIdService(userId);
  return res.status(200).json(user);
};
