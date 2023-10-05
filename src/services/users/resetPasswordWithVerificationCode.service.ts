import { AppError } from '../../errors/error';
import { userRepo } from '../../repositories';

export const resetPasswordWithVerificationCodeService = async (newPassword: string, code: string) => {
  const userFound: any = await userRepo.findOne({
    where: {
      reset_password: code,
    },
  });

  if (!userFound) throw new AppError('Invalid code', 404);

  const user = userRepo.create({
    ...userFound,
    password: newPassword,
    reset_password: null,
  });

  await userRepo.save(user);

  return;
};
