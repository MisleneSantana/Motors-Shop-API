import { AppError } from '../../errors/error';
import { userRepo } from '../../repositories';

export const resetPasswordService = async (password: string, code: string) => {
  const userFound: any = await userRepo.findOne({
    where: {
      reset_password: code,
    },
  });

  if (!userFound) throw new AppError('User not found', 404);

  const user = userRepo.create({
    ...userFound,
    password: password,
    reset_password: null,
  });

  await userRepo.save(user);

  return;
};
