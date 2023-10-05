import { AppError } from '../../errors/error';
import { userRepo } from '../../repositories';
import * as crypto from 'crypto';
import { resetUserPasswordMailgen } from '../../utils/resetUserPasswordMailgen.util';
import { sendEmailNodemailer } from '../../utils/nodemailer.util';

export const sendEmailWithCodeService = async (email: string) => {
  const user = await userRepo.findOne({ where: { email: email } });

  if (!user) throw new AppError('User not found', 404);

  const resetUserCode = crypto.randomBytes(4).toString('hex');
  const nowInMinutes: any = new Date().getHours() * 60 + new Date().getMinutes();

  await userRepo.save({
    ...user,
    reset_password: resetUserCode,
    code_expire: nowInMinutes,
  });

  const recoveryPassword = resetUserPasswordMailgen(user.name, email, resetUserCode);

  await sendEmailNodemailer(recoveryPassword);

  return recoveryPassword;
};
