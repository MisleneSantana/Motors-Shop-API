import { Announcement } from '../../entities';
import { AppError } from '../../errors/error';
import { announcementRepo } from '../../repositories';

export const deleteAnnouncementService = async (announcementId: string): Promise<void> => {
  const announcement: Announcement | null = await announcementRepo.findOneBy({ id: announcementId });

  if (!announcement) throw new AppError('Announcement not found', 404);
  await announcementRepo.softRemove(announcement);
};
