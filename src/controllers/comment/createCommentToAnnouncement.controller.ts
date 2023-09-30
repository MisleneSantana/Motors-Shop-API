import { Request, Response } from 'express';
import { createCommentToAnnouncementService } from '../../services/comments/createCommentToAnnouncement.service';
import { TCommentCreate } from '../../interfaces/comment.interfaces';

export const createCommentToAnnouncementController = async (req: Request, res: Response): Promise<Response> => {
  const userId: string = res.locals.decoded.sub;
  const announcementId: string = req.params.id;
  const commentData = req.body;

  const newComment: TCommentCreate = await createCommentToAnnouncementService(userId, announcementId, commentData);

  return res.status(201).json(newComment);
};
