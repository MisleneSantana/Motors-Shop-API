import { Request, Response } from 'express';
import { deleteAnnouncementService } from '../../services/announcements/deleteAnnouncement.service';

export const deleteAnnouncementController = async (req: Request, res: Response): Promise<Response> => {
  const announcementId: string = req.params.id;

  await deleteAnnouncementService(announcementId);
  return res.status(204).send();
};
