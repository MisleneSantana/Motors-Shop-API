import { User } from '../../entities';
import { AppError } from '../../errors/error';
import { TAddressUpdate } from '../../interfaces/address.interfaces';
import { TUserReturn, TUserUpdate } from '../../interfaces/user.interfaces';
import { addressRepo, userRepo } from '../../repositories';
import { userReturnSchema } from '../../schemas/user.schema';

export const updateUserService = async (userFound: User, userData: TUserUpdate): Promise<TUserReturn> => {
  const currentUserData: User | null = await userRepo.findOne({
    where: { id: userFound.id },
    relations: { address: true },
  });

  if (!currentUserData) {
    throw new AppError('User not found');
  }

  const addressUpdated: TAddressUpdate = addressRepo.create({
    ...currentUserData.address,
    ...userData.address,
  });
  await addressRepo.save(addressUpdated);

  const userUpdated: any = userRepo.create({
    ...currentUserData,
    ...userData,
    address: addressUpdated,
  });
  await userRepo.save(userUpdated);

  return userReturnSchema.parse(userUpdated);
};
