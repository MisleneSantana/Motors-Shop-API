import { Request, Response } from 'express';
import { resetPasswordWithVerificationCodeService } from '../../services/users/resetPasswordWithVerificationCode.service';

export const resetPasswordWithVerificationCodeController = async (req: Request, res: Response): Promise<Response> => {
  const { password } = req.body;
  const { code } = req.params;

  await resetPasswordWithVerificationCodeService(password, code);
  return res.status(200).json({ message: 'Updated password' });
};
