import { Request, Response } from 'express';
import { TAnnouncementReturn } from '../../interfaces/announcement.interfaces';
import { updateAnnouncementService } from '../../services/announcements/updateAnnouncement.service';

export const updateAnnouncementController = async (req: Request, res: Response): Promise<Response> => {
  const announcementId: string = req.params.id;
  const announcementData: any = req.body;

  const announcement: TAnnouncementReturn = await updateAnnouncementService(announcementId, announcementData);
  return res.status(200).json(announcement);
};
