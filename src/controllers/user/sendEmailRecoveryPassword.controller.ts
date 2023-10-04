import { Request, Response } from 'express';
import { sendEmailRecoveryPasswordService } from '../../services/users/sendEmailRecoveryPassword.service';

export const sendEmailRecoveryPasswordController = async (req: Request, res: Response): Promise<Response> => {
  const { email } = req.body;

  await sendEmailRecoveryPasswordService(email);
  return res.status(200).json({ message: 'New code sent' });
};
