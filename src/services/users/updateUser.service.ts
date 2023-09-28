import { User } from '../../entities';
import { TAddressUpdate } from '../../interfaces/address.interfaces';
import { TUserReturn, TUserUpdate } from '../../interfaces/user.interfaces';
import { addressRepo, userRepo } from '../../repositories';
import { userReturnSchema } from '../../schemas/user.schema';

export const updateUserService = async (userFound: User, userData: TUserUpdate): Promise<TUserReturn> => {
  const { address } = userData;

  if (address) {
    const user = await userRepo.findOne({ where: { id: userFound.id }, relations: { address: true } });

    if (user) {
      const addressUpdated: TAddressUpdate = addressRepo.create({
        ...user.address,
        ...address,
      });
      await addressRepo.save(addressUpdated);
    }
  }

  const userUpdated: any = userRepo.create({
    ...userFound,
    ...userData,
  });
  await userRepo.save(userUpdated);

  return userReturnSchema.parse(userUpdated);
};
