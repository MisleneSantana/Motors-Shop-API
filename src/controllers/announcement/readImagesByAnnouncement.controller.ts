import { Request, Response } from 'express';
import { readImagesByAnnouncementService } from '../../services/announcements/readImagesByAnnouncement.service';

export const readImagesByAnnouncementController = async (req: Request, res: Response): Promise<Response> => {
  const announcementIdId: string = req.params.id;

  const imagesByAnnouncementId = await readImagesByAnnouncementService(announcementIdId);
  return res.status(200).json(imagesByAnnouncementId);
};
