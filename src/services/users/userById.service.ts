import { User } from '../../entities';
import { TUserReturn } from '../../interfaces/user.interfaces';
import { userRepo } from '../../repositories';
import { userReturnSchema } from '../../schemas/user.schema';

export const userByIdService = async (userId: string): Promise<TUserReturn> => {
  const findUser: User | null = await userRepo.findOne({ where: { id: userId }, relations: ['address'] });

  return userReturnSchema.parse(findUser);
};
