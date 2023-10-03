import { Announcement, Image } from '../../entities';
import { AppError } from '../../errors/error';
import { announcementRepo, imageRepo } from '../../repositories';
import { imageReturnSchema } from '../../schemas/image.schema';

export const readImagesByAnnouncementService = async (announcementId: string) => {
  const foundAnnouncement: Announcement | null = await announcementRepo.findOne({
    where: { id: announcementId },
  });

  if (!foundAnnouncement) throw new AppError('Announcement not found', 404);

  const images: Image[] | null = await imageRepo.find({
    where: { announcement: { id: announcementId } },
    relations: {
      announcement: true,
    },
  });

  if (!images || images.length === 0) throw new AppError('This announcement has no images', 404);

  return imageReturnSchema.parse(images);
};
