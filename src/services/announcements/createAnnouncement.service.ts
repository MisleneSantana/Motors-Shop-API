import { Announcement, Image, User } from '../../entities';
import { AppError } from '../../errors/error';
import { TAnnouncementCreate } from '../../interfaces/announcement.interfaces';
import { UserRole } from '../../interfaces/user.interfaces';
import { announcementRepo, imageRepo, userRepo } from '../../repositories';
import { announcementReturnSchema } from '../../schemas/announcement.schema';

export const createAnnouncementService = async (userId: string, announcementData: TAnnouncementCreate) => {
  const user: User | null = await userRepo.findOne({ where: { id: userId } });
  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (user.account_type === UserRole.COMPRADOR) {
    throw new AppError(`Only allowed for ${UserRole.COMPRADOR} profiles`, 403);
  }

  // const { images } = announcementData;
  // const imageAnnouncement: any = await imageRepo.save(images);
  // console.log(imageAnnouncement);

  const newAnnouncement: Announcement = announcementRepo.create({
    ...announcementData,
    user,
    // images: imageAnnouncement,
  });

  await announcementRepo.save(newAnnouncement);

  return announcementReturnSchema.parse(newAnnouncement);
};
