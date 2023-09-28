import { Request, Response } from 'express';
import { readAllUsersService } from '../../services/users/readAllUsers.service';
import { TUserRead } from '../../interfaces/user.interfaces';

export const readUsersController = async (req: Request, res: Response): Promise<Response> => {
  const users: TUserRead = await readAllUsersService();
  return res.status(200).json(users);
};
