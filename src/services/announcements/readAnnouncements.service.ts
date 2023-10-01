import { Announcement } from '../../entities';
import { TAnnouncementRead} from '../../interfaces/announcement.interfaces';
import { announcementRepo } from '../../repositories';
import { announcementReadSchema } from '../../schemas/announcement.schema';

export const readAnnouncementsService = async (): Promise<TAnnouncementRead> => {
  const announcements: Announcement[] = await announcementRepo.find({ relations: ['user', 'images'] });

  return announcementReadSchema.parse(announcements);
};
