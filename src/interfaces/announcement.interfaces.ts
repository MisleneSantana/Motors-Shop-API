import { z } from 'zod';
import {
  announcementCreateSchema,
  announcementReadSchema,
  announcementReturnSchema,
  announcementSchema,
} from '../schemas/announcement.schema';
import { DeepPartial, Repository } from 'typeorm';
import { Announcement } from '../entities';

export type TAnnouncement = z.infer<typeof announcementSchema>;
export type TAnnouncementCreate = z.infer<typeof announcementCreateSchema>;
export type TAnnouncementRead = z.infer<typeof announcementReadSchema>;
export type TAnnouncementReturn = z.infer<typeof announcementReturnSchema>;
export type TAnnouncementUpdate = DeepPartial<Announcement>;
export type TAnnouncementRepo = Repository<Announcement>;
