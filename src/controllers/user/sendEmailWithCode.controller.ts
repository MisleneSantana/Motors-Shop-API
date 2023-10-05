import { Request, Response } from 'express';
import { sendEmailWithCodeService } from '../../services/users/sendEmailWithCode.service';

export const sendEmailWithCodeController = async (req: Request, res: Response): Promise<Response> => {
  const { email } = req.body;

  await sendEmailWithCodeService(email);
  return res.status(200).json({ message: 'New code sent' });
};
