import { TUserRead } from '../../interfaces/user.interfaces';
import { userRepo } from '../../repositories';
import { userReadSchema } from '../../schemas/user.schema';

export const readAllUsersService = async (): Promise<TUserRead> => {
  const users = await userRepo.find({ relations: { address: true } });
  return userReadSchema.parse(users);
};
