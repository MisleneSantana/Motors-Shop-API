import { Request, Response } from 'express';
import { TAnnouncementReturn } from '../../interfaces/announcement.interfaces';
import { readAnnouncementByIdService } from '../../services/announcements/readAnnouncementById.service';

export const readAnnouncementByIdController = async (req: Request, res: Response): Promise<Response> => {
  const announcementId: string = req.params.id;

  const announcement: TAnnouncementReturn = await readAnnouncementByIdService(announcementId);
  return res.status(200).json(announcement);
};
