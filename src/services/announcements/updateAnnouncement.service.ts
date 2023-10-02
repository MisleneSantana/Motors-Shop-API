import { Announcement } from '../../entities';
import { AppError } from '../../errors/error';
import { TAnnouncementUpdate } from '../../interfaces/announcement.interfaces';
import { announcementRepo, imageRepo } from '../../repositories';

// (Salvar primeiro sempre o lado 1 -> da relação 1:N)
export const updateAnnouncementService = async (announcementId: string, announcementData: TAnnouncementUpdate) => {
  const oldAnnouncement: Announcement | null = await announcementRepo.findOne({
    where: { id: announcementId },
    relations: { images: true, user: true },
  });

  if (!oldAnnouncement || oldAnnouncement.id !== announcementId) {
    throw new AppError('Announcement not found', 404);
  }

  const announcement: Announcement = announcementRepo.create({
    ...oldAnnouncement,
    ...announcementData,
  });
  await announcementRepo.save(announcement);

  for await (const image of announcementData.images!) {
    const imageUpdated = imageRepo.create({
      image_url: image.image_url!,
      announcement: announcement,
    });
    await imageRepo.save(imageUpdated);
  }

  const announcementUpdated = announcementRepo.findOne({
    where: { id: announcement.id },
    relations: { images: true },
  });
  return announcementUpdated;
};
