import { Request, Response } from 'express';
import { User } from '../../entities';
import { TUserReturn } from '../../interfaces/user.interfaces';
import { updateUserService } from '../../services/users/updateUser.service';

export const updateUserController = async (req: Request, res: Response): Promise<Response> => {
  const foundUser: User = res.locals.userFound;
  const userData: any = req.body;

  const user: TUserReturn = await updateUserService(foundUser, userData);
  return res.status(200).json(user);
};
