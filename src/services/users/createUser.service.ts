import { User } from '../../entities';
import { TAddressReturn } from '../../interfaces/address.interfaces';
import { TUserCreate, TUserReturn } from '../../interfaces/user.interfaces';
import { addressRepo, userRepo } from '../../repositories';
import { userReturnSchema } from '../../schemas/user.schema';

export const createUserService = async ({ address, ...userData }: TUserCreate): Promise<TUserReturn> => {
  const userAddress: TAddressReturn = await addressRepo.save(address);

  const newUser: User = userRepo.create({
    ...userData,
    address: userAddress,
  });
  await userRepo.save(newUser);

  return userReturnSchema.parse(newUser);
};
