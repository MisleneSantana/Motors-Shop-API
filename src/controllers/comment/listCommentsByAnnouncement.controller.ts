import { Request, Response } from 'express';
import { listCommentsByAnnouncementService } from '../../services/comments/listCommentsByAnnouncement.service';

export const listCommentsByAnnouncementController = async (req: Request, res: Response): Promise<Response> => {
  const announcementId: string = req.params.id;

  const allCommentsByAnnouncement = await listCommentsByAnnouncementService(announcementId);
  return res.status(200).json(allCommentsByAnnouncement);
};
