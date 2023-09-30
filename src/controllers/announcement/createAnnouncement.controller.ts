import { Request, Response } from 'express';
import { createAnnouncementService } from '../../services/announcements/createAnnouncement.service';
import { TAnnouncementCreate, TAnnouncementReturn } from '../../interfaces/announcement.interfaces';

export const createAnnouncementController = async (req: Request, res: Response): Promise<Response> => {
  const userId: string = res.locals.decoded.sub;
  const announcementData: TAnnouncementCreate = req.body;

  // console.log(userId);

  const newAnnouncement: TAnnouncementReturn = await createAnnouncementService(userId, announcementData);
  return res.status(200).json(newAnnouncement);
};
