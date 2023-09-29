import { Request, Response } from 'express';
import { readUsersService } from '../../services/users/readUsers.service';
import { TUserRead } from '../../interfaces/user.interfaces';

export const readUsersController = async (req: Request, res: Response): Promise<Response> => {
  const users: TUserRead = await readUsersService();
  return res.status(200).json(users);
};
