import { TUserReturn } from '../../interfaces/user.interfaces';
import { userRepo } from '../../repositories';
import { userReturnSchema } from '../../schemas/user.schema';

export const readUserLoggedService = async (userId: string): Promise<TUserReturn> => {
  const user = await userRepo.findOne({
    where: {
      id: userId,
    },
    relations: ['address'],
  });

  return userReturnSchema.parse(user);
};
