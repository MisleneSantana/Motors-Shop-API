import { AppError } from '../../errors/error';
import { userRepo } from '../../repositories';

export const resetPasswordWithVerificationCodeService = async (newPassword: string, code: string) => {
  const userFound: any = await userRepo.findOne({
    where: {
      reset_password: code,
    },
  });

  if (!userFound) throw new AppError('Invalid code', 404);

  const nowInMinutes: any = new Date().getHours() * 60 + new Date().getMinutes();
  if (userFound.code_expire + 60 <= nowInMinutes) {
    const user = userRepo.create({
      ...userFound,
      reset_password: null,
      code_expire: null,
    });

    await userRepo.save(user);
    throw new AppError('Code expired', 400);
  }

  const user = userRepo.create({
    ...userFound,
    password: newPassword,
    reset_password: null,
    code_expire: null,
  });

  await userRepo.save(user);

  return;
};
