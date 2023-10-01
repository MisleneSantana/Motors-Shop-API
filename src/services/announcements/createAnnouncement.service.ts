import { Announcement, User } from '../../entities';
import { AppError } from '../../errors/error';
import { TAnnouncementCreate } from '../../interfaces/announcement.interfaces';
import { UserRole } from '../../interfaces/user.interfaces';
import { announcementRepo, imageRepo, userRepo } from '../../repositories';
import { announcementReturnSchema } from '../../schemas/announcement.schema';

export const createAnnouncementService = async (
  userId: string,
  { images, ...announcementData }: TAnnouncementCreate
) => {
  const user: User | null = await userRepo.findOne({ where: { id: userId } });
  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (user.account_type.toUpperCase() === UserRole.COMPRADOR.toUpperCase()) {
    throw new AppError(`Only allowed for ${UserRole.COMPRADOR} profiles`, 403);
  }

  const newImage: any = await imageRepo.save(images);
  // console.log(newImage);

  const newAnnouncement: Announcement = announcementRepo.create({
    ...announcementData,
    user,
    images: newImage,
  });

  await announcementRepo.save(newAnnouncement);

  return announcementReturnSchema.parse(newAnnouncement);
};
