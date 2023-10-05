import { Announcement } from '../../entities';
import { AppError } from '../../errors/error';
import { TPaginationParams } from '../../interfaces/pagination.interfaces';
import { announcementRepo } from '../../repositories';
import { announcementReadSchema } from '../../schemas/announcement.schema';

export const readAnnouncementsService = async ({
  page,
  perPage,
  order,
  sort,
  prevPage,
  nextPage,
}: TPaginationParams): Promise<any> => {
  const [announcements, count]: [Array<Announcement>, number] = await announcementRepo.findAndCount({
    order: { [sort]: order },
    skip: page,
    take: perPage,
    relations: ['user', 'images'],
  });

  if (announcements.length === 0) throw new AppError('There are announcements', 400);

  if (count - page <= perPage) {
    nextPage = null;
  }

  return {
    prevPage,
    nextPage,
    count,
    data: announcementReadSchema.parse(announcements),
  };
};
