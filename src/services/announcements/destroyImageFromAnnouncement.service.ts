import { Image } from '../../entities';
import { AppError } from '../../errors/error';
import { imageRepo } from '../../repositories';

export const destroyImageFromAnnouncementService = async (announcementId: string, imageId: string): Promise<void> => {
  const image: Image | null = await imageRepo.findOne({
    where: { id: imageId, announcement: { id: announcementId } },
  });

  if (!image) throw new AppError('Image not found', 404);

  await imageRepo.remove(image);
};
