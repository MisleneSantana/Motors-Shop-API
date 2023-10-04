import { Request, Response } from 'express';
import { resetPasswordService } from '../../services/users/resetPassword.service';

export const resetPasswordController = async (req: Request, res: Response): Promise<Response> => {
  const { password } = req.body;
  const { code } = req.params;

  await resetPasswordService(password, code);
  return res.status(200).json({ message: 'Your password has been updated' });
};
