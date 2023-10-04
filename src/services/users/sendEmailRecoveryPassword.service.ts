import { AppError } from '../../errors/error';
import { userRepo } from '../../repositories';
import * as crypto from 'crypto';
import { resetUserPasswordMailgen } from '../../utils/resetUserPasswordMailgen.util';
import { sendEmailNodemailer } from '../../utils/nodemailer.util';

export const sendEmailRecoveryPasswordService = async (email: string) => {
  const user = await userRepo.findOne({ where: { email: email } });

  if (!user) throw new AppError('User not found', 404);

  const resetUserCode = crypto.randomBytes(4).toString('hex');
  // console.log('*********', resetUserCode);

  await userRepo.save({
    ...user,
    reset_password: resetUserCode,
  });

  const recoveryPassword = resetUserPasswordMailgen(user.name, email, resetUserCode);

  await sendEmailNodemailer(recoveryPassword);

  return recoveryPassword;
};
