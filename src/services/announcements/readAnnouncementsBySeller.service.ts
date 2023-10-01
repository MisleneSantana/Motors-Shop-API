import { Announcement, User } from '../../entities';
import { AppError } from '../../errors/error';
import { announcementRepo, userRepo } from '../../repositories';
import { announcementReadSchema } from '../../schemas/announcement.schema';

export const readAnnouncementsBySellerService = async (userId: string) => {
  const foundSeller: User | null = await userRepo.findOne({
    where: { id: userId },
  });

  if (!foundSeller) throw new AppError('User/Seller not found', 404);

  const announcements: Announcement[] | null = await announcementRepo.find({
    where: { user: { id: userId } },
    relations: {
      user: true,
      images: true,
    },
  });

  if (!announcements || announcements.length === 0) throw new AppError('This seller has no announcements', 404);

  return announcementReadSchema.parse(announcements);
};
