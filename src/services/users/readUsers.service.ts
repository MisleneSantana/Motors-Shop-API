import { TUserRead } from '../../interfaces/user.interfaces';
import { userRepo } from '../../repositories';
import { userReadSchema } from '../../schemas/user.schema';
import { User } from '../../entities';

export const readUsersService = async (): Promise<TUserRead> => {
  const users: User[] = await userRepo.find({ relations: ['address'] });
  return userReadSchema.parse(users);
};
