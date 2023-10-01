import { Announcement } from '../../entities';
import { AppError } from '../../errors/error';
import { TAnnouncementReturn } from '../../interfaces/announcement.interfaces';
import { announcementRepo } from '../../repositories';
import { announcementReturnSchema } from '../../schemas/announcement.schema';

export const readAnnouncementByIdService = async (announcementId: string): Promise<TAnnouncementReturn> => {
  const findAnnouncement: Announcement | null = await announcementRepo.findOne({
    where: { id: announcementId },
    relations: ['user', 'images'],
  });

  if (!findAnnouncement) throw new AppError('Announcement not found', 404);

  return announcementReturnSchema.parse(findAnnouncement);
};
