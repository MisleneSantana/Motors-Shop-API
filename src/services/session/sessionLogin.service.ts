import { compare } from 'bcryptjs';
import { AppError } from '../../errors/error';
import { TSessionLoginCreate, TSessionLoginReturn } from '../../interfaces/session.interface';
import { userRepo } from '../../repositories';
import { sign } from 'jsonwebtoken';

export const sessionLoginService = async (userData: TSessionLoginCreate): Promise<TSessionLoginReturn> => {
  const user = await userRepo.findOneBy({ email: userData.email });

  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const matchPassword: boolean = await compare(userData.password, user.password);
  if (!matchPassword) throw new AppError('Invalid credentials', 401);

  const token: string = sign(
    {
      account_type: user.account_type,
    },
    String(process.env.SECRET_KEY),
    {
      subject: user.id.toString(),
      expiresIn: process.env.EXPIRES_IN,
    }
  );

  return { token };
};
