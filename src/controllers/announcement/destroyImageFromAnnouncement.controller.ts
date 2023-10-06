import { Request, Response } from 'express';
import { destroyImageFromAnnouncementService } from '../../services/announcements/destroyImageFromAnnouncement.service';

export const destroyImageFromAnnouncementController = async (req: Request, res: Response) => {
  const { announcementId, imageId } = req.params;

  await destroyImageFromAnnouncementService(announcementId, imageId);

  return res.status(204).send();
};
