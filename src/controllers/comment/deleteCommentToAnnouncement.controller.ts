import { Request, Response } from 'express';
import { deleteCommentToAnnouncementService } from '../../services/comments/deleteCommentToAnnouncement.service';

export const deleteCommentToAnnouncementController = async (req: Request, res: Response): Promise<Response> => {
  await deleteCommentToAnnouncementService(req.params.id);
  return res.status(204).send();
};
