import { Request, Response } from 'express';
import { readCommentsByAnnouncementService } from '../../services/comments/readCommentsByAnnouncement.service';

export const readCommentsByAnnouncementController = async (req: Request, res: Response): Promise<Response> => {
  const announcementId: string = req.params.id;

  const allCommentsByAnnouncement = await readCommentsByAnnouncementService(announcementId);
  return res.status(200).json(allCommentsByAnnouncement);
};
