import { Request, Response } from 'express';
import { TAnnouncementRead } from '../../interfaces/announcement.interfaces';
import { readAnnouncementsService } from '../../services/announcements/readAnnouncements.service';


export const readAnnouncementsController = async (req: Request, res: Response): Promise<Response> => {
  const announcements: TAnnouncementRead = await readAnnouncementsService();
  return res.status(200).json(announcements);
};
