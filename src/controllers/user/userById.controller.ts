import { Request, Response } from 'express';
import { TUserReturn } from '../../interfaces/user.interfaces';
import { userByIdService } from '../../services/users/userById.service';

export const userByIdController = async (req: Request, res: Response): Promise<Response> => {
  const userId: string = res.locals.userFound.id;

  const user: TUserReturn = await userByIdService(userId);
  return res.status(200).json(user);
};
