import { Announcement, Image } from '../../entities';
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

  const allImages: any = [];

  // for await (const image of oldAnnouncement.images) {
  //   const imageUpdated = imageRepo.create({
  //     ...image,
  //     ...announcementData.images,
  //   });
  //   await imageRepo.save(imageUpdated);
  //   allImages.push(imageUpdated);
  // }

  // for await (const image of oldAnnouncement.images) {
  //   const newDataImage = announcementData.images;

  //   newDataImage!.forEach(async (newImage) => {
  //     const imageUpdated = imageRepo.create({
  //       ...image,
  //       ...newImage,
  //     });
  //     await imageRepo.save(imageUpdated);
  //   });

  //   allImages.push(newDataImage);
  // }

  // const imageUpdated: TImageUpdate = imageRepo.create({
  //   ...oldAnnouncement.images,
  //   ...announcementData.images,
  // });
  // await imageRepo.save(imageUpdated);

  const announcementUpdated: TAnnouncementUpdate = announcementRepo.create({
    ...oldAnnouncement,
    ...announcementData,
    images: allImages,
  });
  await announcementRepo.save(announcementUpdated);

  return announcementReturnSchema.parse(announcementUpdated);
};
