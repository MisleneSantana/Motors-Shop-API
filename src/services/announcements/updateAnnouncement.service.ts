import { Announcement } from '../../entities';
import { AppError } from '../../errors/error';
import { TAnnouncementReturn, TAnnouncementUpdate } from '../../interfaces/announcement.interfaces';
import { TImageUpdate } from '../../interfaces/image.interfaces';
import { announcementRepo, imageRepo } from '../../repositories';
import { announcementReturnSchema } from '../../schemas/announcement.schema';

export const updateAnnouncementService = async (
  announcementId: string,
  announcementData: TAnnouncementUpdate
): Promise<TAnnouncementReturn> => {
  const oldAnnouncement: Announcement | null = await announcementRepo.findOne({
    where: { id: announcementId },
    relations: { images: true, user: true },
  });

  if (!oldAnnouncement || oldAnnouncement.id !== announcementId) {
    throw new AppError('Announcement not found', 404);
  }

  // const oldImages: Image[] | null = await imageRepo.find({
  //   where: { announcement: { id: announcementId } },
  // });

  // for await (const image of oldImages) {
  //   console.log(image);
  //   const imageUpdated: TImageUpdate = imageRepo.create({
  //     ...oldAnnouncement.images,
  //     ...image,
  //   });
  //   await imageRepo.save(imageUpdated);
  // }

  const imageUpdated: TImageUpdate = imageRepo.create({
    ...oldAnnouncement.images,
    ...announcementData.images,
  });
  await imageRepo.save(imageUpdated);

  // console.log(imageUpdated);

  const announcementUpdated: TAnnouncementUpdate = announcementRepo.create({
    ...oldAnnouncement,
    ...announcementData,
    images: imageUpdated,
  });
  await announcementRepo.save(announcementUpdated);

  return announcementReturnSchema.parse(announcementUpdated);
};
